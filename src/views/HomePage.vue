<template>
  <div class="home" style="display: flex; justify-content: center;">
    <div class="columns is-multiline" style="width: 80vw;">
      <!-- 搜索框 -->
      <div class="column is-12" style="position: relative">
        <img src="../assets/放大镜.png" style="position: absolute; right: 15vw; width: 20px; height: 20px; top: 23px">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索商品..."
            @input="filterProducts"
            style="width: 20%; padding: 10px 10px 10px 25px; margin-bottom: 20px; float: right;"
        />
        <!-- 价格筛选下拉菜单 -->
        <div class="column is-12" style="margin-bottom: 1vh;">
          <select v-model="selectedPriceRange" @change="filterProducts"
                  style="width: 8%; position: absolute; right: 0.7vw; top: 6vh;">
            <option value="">不限价格</option>
            <option value="0-100">0-100元</option>
            <option value="100-500">100-500元</option>
            <option value="500-1000">500-1000元</option>
            <option value="1000">1000元以上</option>
          </select>
        </div>
      </div>

      <!-- 轮播图和商品展示 -->
      <div style="margin-bottom: 50px; height: 80vh;background-color: white" v-if="!isFiltering">
        <el-carousel trigger="click" :autoplay="true" interval="3000">
          <el-carousel-item v-for="item in latestProducts" :key="item.id"
                            :style="carouselItemStyle(item)">
            <div class="jieshao" style="width: 30vw; height: 40vh; float: left; padding: 10px;">
              <h1 style="font-weight: bold; font-size: 2.33vw; color: black;">{{ item.name }}</h1>
              <h1 style="margin-bottom: 10vh; color: gray;">靓仔，我看你骨骼惊奇，非常适合这一款{{item.name}}！</h1>
              <span style="float: left">￥</span>
              <h1 style="font-size: 2.33vw; font-weight: bold; color: #2D9CDB">{{ item.price1 }}</h1>
              <button id="btn_add" @click="addToCart(item)"
                      style="width: 13vw; height: 7vh; background-color: #2D9CDB; color: white; border: none">立即抢购</button>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <h1 v-if="filteredProducts.length > 0" style="text-align: center;
       margin: 20px 0; width: 100%; font-size: 2.5vw;font-weight: 700;color: #999">———  商品列表  ———</h1>
      <!-- 商品展示 -->
      <ProductBox
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @addToCart="addToCart"
      />

      <!-- 商品为空提示 -->
      <div v-if="filteredProducts.length === 0 && isFiltering" class="empty-message"
          style="width: 100%;height: 75vh">
        <img src="../assets/cart-empty.png">
        <h2>商品为空</h2>
        <p>当前没有符合条件的商品，请尝试其他搜索或筛选条件。</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ProductBox from "../components/ProductBox.vue";

export default {
  name: 'HomePage',
  data() {

    return {
      user: this.$store.getters.getUserInfo?.state.user ?? {},
      latestProducts: [],
      filteredProducts: [],
      searchQuery: '',
      selectedPriceRange: '',
      cart: {
        items: [],
      },
      isFiltering: false, // 新增状态变量

    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getLatestProducts();
    this.getCartItem();
    document.title = 'Shopping';
    this.isFiltering = false; // 初始化状态
  },
  methods: {
    async getLatestProducts() {
      await axios.get('/api/goods/list')
          .then(response => {
            this.latestProducts = response.data;
            this.filteredProducts = response.data; // 初始化过滤后的产品
            this.$store.state.goods = response.data;
          })
          .catch(error => console.log(error));
    },
    filterProducts() {
      const query = this.searchQuery.toLowerCase();
      this.isFiltering = !!(query || this.selectedPriceRange); // 检查是否有过滤条件

      this.filteredProducts = this.latestProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(query);

        // 处理价格区间
        let withinPriceRange = true;
        if (this.selectedPriceRange) {
          const [min, max] = this.selectedPriceRange.split('-').map(Number);
          if (max) {
            withinPriceRange = product.price1 >= min && product.price1 < max;
          } else {
            withinPriceRange = product.price1 >= min; // 处理 "1000+" 的情况
          }
        }

        return matchesSearch && withinPriceRange;
      });
    },
    async getCartItem() {
      await axios.get("/api/cart/listByUser", {
        params: {
          userId: this.$store.getters.getUserInfo.state.user.userId
        }
      }).then(response => {
        this.cart.items = response.data;
      }).catch(error => console.log(error));
      this.$store.commit('initAddCart', this.cart);
    },
    async addToCart(product) {
      if (!this.user.userId) {
        alert('未登录！请先登录。');
        this.$router.push('/login');
      } else {
        await axios.get("/api/cart/add", {
          params: {
            userId: this.$store.getters.getUserInfo.state.user.userId,
            goodsId: product.id,
            num: 1,
            price: product.price1,
          }
        }).then(response => {
          this.cart.items = response.data;
        }).catch(error => console.log(error));
        this.$store.commit('initAddCart', this.cart);
        alert("添加成功！");
      }
    },
    carouselItemStyle(item) {
      return {
        backgroundImage: 'url(http://10.60.81.45:8080/' + item.pthumbnail + ')',
        backgroundSize: 'fill',
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundRepeat: 'no-repeat',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
      };
    },
  },
};
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
::v-deep .el-carousel__container{
  width: 80vw;
  height: 70vh;
}
::v-deep .el-image{
  width: 100%;
  height: 100%;
}
::v-deep .el-icon{
  color: white;
}
::v-deep .el-carousel__arrow{
  background-color: blue;
  transform: translateX(40%)!important;
}
.empty-message {
  text-align: center;
  margin-top: 20px;
  font-size: 1.5em;
  color: #888;
}
</style>

