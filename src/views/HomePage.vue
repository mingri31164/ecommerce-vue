<template>
  <div class="home" style="display: flex; justify-content: center;">
    <!-- 商品 -->
    <div class="columns is-multiline" style="width: 80vw;">
      <!-- 搜索框 -->
      <div class="column is-12">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索商品..."
            @input="filterProducts"
            style="width: 100%; padding: 10px; margin-bottom: 20px;"
        />
      </div>

      <!-- 轮播图 -->
      <div style="margin-bottom: 50px">
        <el-carousel trigger="click" :autoplay="true" interval="3000">
          <el-carousel-item v-for="item in latestProducts" :key="item.id"
                            :style="{ backgroundImage:
                            'url(http://10.60.81.45:8080/' + item.pthumbnail + ')',
                            backgroundSize: 'fill', width: '100%',height: '100%', display: 'flex',
                            backgroundRepeat: 'no-repeat',  // 不重复
                            flexDirection: 'column',
                            justifyContent: 'center', alignItems: 'flex-end' }">
            <div class="jieshao" style="width: 37vw; height: 40vh;
            float: left; padding: 10px;">
              <h1 style="font-weight: bold; font-size: 2.33vw; color: black;">{{ item.name }}</h1>
              <h1 style="margin-bottom: 10vh; color: gray;">靓仔，我看你骨骼惊奇，非常适合这一款{{item.name}}！</h1>
              <span style="float: left">￥</span>
              <h1 style="font-size: 2.33vw;font-weight: bold;color: #2D9CDB">{{ item.price1 }}</h1>
              <button id="btn_add" @click="addToCart(item)"
                      style="width: 13vw;height: 7vh;background-color: #2D9CDB;color: white;
                      border: none">立即抢购</button>
            </div>

          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 轮播图END -->

      <!-- 显示过滤后的商品 -->
        <ProductBox
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @addToCart="addToCart"
        />

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
      await axios
          .get('/api/goods/list')
          .then(response => {
            this.latestProducts = response.data;
            this.filteredProducts = response.data; // 初始化过滤后的产品
            this.$store.state.goods = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    filterProducts() {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.latestProducts.filter(product =>
          product.name.toLowerCase().includes(query)
      );
    },
    async getCartItem() {
      await axios
          .get("/api/cart/listByUser", {
            params: {
              userId: this.$store.getters.getUserInfo.state.user.userId
            }
          })
          .then(response => {
            this.cart.items = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      this.$store.commit('initAddCart', this.cart);
    },
    async addToCart(product) {
      if (!this.user.userId) {
        alert('未登录！请先登录。');
        this.$router.push('/login'); // 跳转到登录页面
      } else {
        await axios
            .get("/api/cart/add", {
              params: {
                userId: this.$store.getters.getUserInfo.state.user.userId,
                goodsId: product.id,
                num: 1,
                price: product.price1,
              }
            })
            .then(response => {
              this.cart.items = response.data;
            })
            .catch(error => {
              console.log(error);
            });
        this.$store.commit('initAddCart', this.cart);
        alert("抢购成功！")

      }

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
</style>

