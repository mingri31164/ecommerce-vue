<template>
  <div class="home" style="display: flex; justify-content: center;">
    <div class="columns is-multiline" style="width: 80vw;">

      <!-- 轮播图和商品展示 -->
      <div style="margin-bottom: 50px; height: 77vh;background-color: white"
           v-if="!$store.getters.isFiltering && $store.getters.filteredGoods.length !== 0">
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

      <h1 v-if="$store.getters.filteredGoods.length > 0" style="text-align: center;
       margin: 20px 0; width: 100%; font-size: 2.5vw;font-weight: 700;color: #999">———  商品列表  ———</h1>
      <!-- 商品展示 -->
      <ProductBox
          v-for="product in $store.getters.filteredGoods"
          :key="product.id"
          :product="product"
          @addToCart="addToCart"
      />


      <!-- 商品为空提示 -->
      <div v-if="$store.getters.filteredGoods.length === 0" class="empty-message"
          style="width: 100%;height: 70vh">
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
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getLatestProducts();
    this.getCartItem();
    document.title = 'Shopping';
  },
  methods: {
    async getLatestProducts() {
      await axios.get('/api/goods/list')
          .then(response => {
            this.latestProducts = response.data;
            this.$store.commit('setGoods', response.data); // 同步到 Vuex 状态
          })
          .catch(error => console.log(error));
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
      if (confirm('是否立即抢购？'))
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
        alert("加入购物车成功！");
      }
    },
    carouselItemStyle(item) {
      return {
        backgroundImage: 'url(http://10.60.81.180:8080/' + item.pthumbnail + ')',
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

