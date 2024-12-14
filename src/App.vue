<template>
  <div id="wrapper">
    <nav class="navbar" style="height: 11vh;background-color: black">
      <div class="navbar-brand" style="margin-left: 9vw">
        <router-link to="/" class="navbar-item">
          <span class="has-text-grey"></span><strong class="button is-white">首页</strong>
        </router-link>

        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu"
           @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>


      <div class="navbar-item" style="position: relative; width: 30vw;margin-left: 32vw">
        <!-- 搜索框 -->
        <img src="./assets/放大镜.png" style="position: absolute;
         left: 1vw; width: 20px; height: 20px; top: 4.5vh;">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索商品..."
            @input="filterProducts"
            style="width: 70%; padding: 10px 10px 10px 25px; margin-right: 10px;"
        />

        <!-- 价格筛选下拉菜单 -->
        <select
            v-model="selectedPriceRange"
            @change="filterProducts"
            style="width: 20%;"
        >
          <option value="">不限价格</option>
          <option value="0-100">0-100元</option>
          <option value="100-500">100-500元</option>
          <option value="500-1000">500-1000元</option>
          <option value="1000">1000元以上</option>
        </select>
      </div>

      <span style="margin-top: 4vh;color: #b0b0b0">|</span>

      <div class="navbar-menu" id="navbar-menu" v-bind:class="{ 'is-active': showMobileMenu }">
        <div class="navbar-start">
          <div class="navbar-item">
            <form method="get" action="/search">
              <div class="field has-addons">
              </div>
            </form>
          </div>
        </div>

        <div class="navbar-end" style="vertical-align: middle!important;">
          <!-- <router-link to="/laptop" class="navbar-item">Laptop</router-link>
          <router-link to="/pc" class="navbar-item">PC</router-link> -->

          <!-- 鼠标悬停触发购物车下拉 -->
          <div
              class="navbar-item"
              @mouseenter="toggleCartDropdown(true)"
              @mouseleave="toggleCartDropdown(false)"
              style="position: relative;">
            <div style="color: #b0b0b0; width: 5.5vw; height: 5vh; line-height: 6vh; overflow: hidden;">
              <img src="./assets/购物车空.png" style="width: 32%; height: 50%;">
              <span class="cart-car" style="margin-left: 0.2vw;">购物车</span>
              <div
                  class="tip"
                  v-if="cartTotalLen > 0 && this.$store.getters.getUserInfo.state.user.userId !== ''"
                  style="position: absolute; top: 3.6vh; left: 1.7vw; width: 20px; height: 20px;
                     background-color: red; border-radius: 50%; color: white;
                     display: flex; align-items: center; justify-content: center; font-size: 12px;">
                {{ cartTotalLen }}
                </div>

              <!-- 下拉购物车内容 -->
              <div
                  v-if="showCartDropdown"
                  class="cart-dropdown"
                  style="position: absolute; top: 9vh; right: 0; background: white;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 22vw;
                  border-radius: 5px; z-index: 1000; max-height: 58vh;
                  overflow-y: auto; display: flex; flex-direction: column;">
                <!-- 商品列表部分 -->
                <div v-if="cartTotalLen > 0
                  && this.$store.getters.getUserInfo.state.user.userId !== ''">
                  <div
                      style="flex: 1; overflow-y: auto;">
                    <div class="tab-item" v-for="item in cart.items" :key="item.id" style="padding: 10px;
                   border-bottom: 1px solid #eee;">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <img :src="'http://10.60.81.45:8080/' + item.thumbnail" alt="商品图片"
                             style="width: 80px; height: 80px;
                           object-fit: cover; min-width: 80px; min-height: 80px;">
                        <div style="flex: 1; margin-left: 20px;">
                          <p style="font-size: 14px; color: #5079d9; font-weight: 500;">{{ item.name }}</p>
                          <div style="display: flex; align-items: center;">
                            <p style="font-size: 14px; color: #d44d44;
                           margin-right: 10px; font-weight: 700;">¥ {{ item.price }}</p>
                            <p style="font-size: 14px; color: #999; font-weight: 600;">x {{ item.num }}</p>
                          </div>
                        </div>
                        <button class="delete" @click="removeCartItem(item)"></button>
                      </div>
                    </div>
                  </div>
                  <!-- 底部固定部分 -->
                  <div style="padding: 10px; text-align: center; justify-content: center;
              border-top: 1px solid #eee; background-color: white;height: 15vh;
              position: sticky; bottom: 0;">
                  <span style="color: rgb(153, 153, 153); font-size: 90%;
                  display: flex;">共{{cartTotalLen}}件商品</span>
                    <span style="font-size: 110%;float: left">合计：
                    <span style="color: red;font-weight: 700">
                    <span>
                      <span style="font-size: 80%">¥</span>
                      <span style="font-size: 140%">{{cartTotalPrice}}</span>
                      </span>
                    </span>
                    </span>
                    <button @click="goToCart" class="button is-primary is-big"
                            style="float: right;margin-top: -2vh;
                          width: 30%;
                          height: 5vh;
                          border: 1px solid #5c81e3;
                          border-radius: 4px;
                          font-size: 12px;
                          color: #fff;
                          background-color: #678ee7;
                          background-image: linear-gradient(180deg, #678ee7, #5078df);">去购物车</button>
                  </div>
                </div>
                <div v-else class="empty-cart">
                  <div class="empty-cart-img"></div>
                  <h6>您的购物车为空！</h6>
                </div>
              </div>
              </div>


            </div>
          </div>


              <router-link to="/login" class="button is-white" v-if="!user.userId"
              style="margin-top: 1.5vh;margin-right: 1vw;">登录</router-link>

              <div class="user" v-else style="margin-right: 7vw">
                <div class="dropdown is-right mx-3 is-active">
                  <div class="dropdown-trigger" style="color: #b0b0b0;
                  width: 5.5vw; height: 11vh;overflow: hidden;">
                    <span aria-haspopup="true" aria-controls="dropdown-menu">
                      <span style="display: flex;align-items: center;">
                        <img src="./assets/用户-实色.png" style="width: 35%; height: 30%;">
                        <span class="user-name"
                              style="margin-left: 0.2vw;font-size: 21px;margin-top: 0.5vh">{{ user.name }}</span>
                      </span>
                    </span>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu" style="margin-top: -3vh">
                    <div class="dropdown-content">
                      <router-link class="dropdown-item" to="/order" style="display: flex;font-size: 1vw">
                        <img src="./assets/_订单.png" style="width: 1.4vw;height: 1.4vw;margin-left: 5vw">
                        <span>订单</span>
                      </router-link>

                      <a class="dropdown-item" @click="logout()"
                         style="display: flex;font-size: 1vw">
                        <img src="./assets/退出.png" style="width: 1.4vw;height: 1.4vw;margin-left: 5vw">
                        <span>注销</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </nav>

    <section class="section">
      <router-view />
    </section>

  </div>
</template>


<style lang="scss">
.dropdown-trigger {
  display: flex;
  align-items: center;
}

.dropdown-menu {
  border-radius: 0;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding-bottom: 4px;
}
.cart-car:hover {
  color: red;
}
.user-name:hover{
  color: red;
}


.cart-dropdown {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.cart-car:hover {
  color: red;
}

.tab-item:hover{
  background-color: #f0f0f0;
}
.empty-cart {
  width: 100%;
  height: 30vh;
  display: flex; /* 使用 Flexbox */
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  text-align: center;
  font-size: 1vw;
  color: #888;
}
.empty-cart-img{
  background-image: url("./assets/购物车空.png");
  background-size: 100% 100%;
  width: 40%;
  height: 40%;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showCartDropdown: false, // 控制购物车下拉显示
      showMobileMenu: false,
      cart: {
        items: []
      },
      user: this.$store.getters.getUserInfo?.state.user ?? {},

      searchQuery: '', // 搜索框内容
      selectedPriceRange: '', // 选中的价格范围
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
    this.getCartItem()
  },
  methods: {
    filterProducts() {
      const query = this.searchQuery.toLowerCase();
      const priceRange = this.selectedPriceRange;

      this.$store.commit('setFiltering', !!(query || priceRange)); // 使用 Vuex 管理过滤状态

      // 过滤商品
      const latestProducts = this.$store.state.goods; // 从 Vuex 获取所有商品
      const filteredProducts = latestProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(query);

        // 处理价格区间
        let withinPriceRange = true;
        if (priceRange) {
          const [min, max] = priceRange.split('-').map(Number);
          withinPriceRange = max
              ? product.price1 >= min && product.price1 < max
              : product.price1 >= min;
        }

        return matchesSearch && withinPriceRange;
      });

      this.$store.commit('updateFilteredProducts', filteredProducts); // 更新过滤后的商品列表
    },
    async removeCartItem(item) {
      try {
        const response = await axios.get('/api/cart/deleteById', {
          params: {
            userId: this.$store.getters.getUserInfo.state.user.userId,
            cartId: item.cardid // 传递商品ID
          }
        });
        this.cart.items = response.data; // 更新购物车内容
      } catch (error) {
        console.error("删除商品失败:", error.message);
      }
    },
    toggleCartDropdown(show) {
      this.showCartDropdown = show;
    },
    goToCart() {
      this.$router.push("/cart");
    },
    goHome() {
      this.$router.push('/'); // 路由跳转
      setTimeout(() => {
        window.location.reload(); // 刷新页面
      }, 0); // 立即执行，确保跳转后刷新
    },
    logout() {
      if (confirm('确定要退出登录吗？')) {
        this.$store.dispatch('removeUserInfo');
        this.user = this.$store.getters.getUserInfo.state.user ?? {};
        this.getCartItem();
        this.$router.push('/login');
      }
    },
    async getCartItem() {
      try {
        const response = await axios.get("/api/cart/listByUser", {
          params: { userId: this.user.userId }
        });
        this.cart.items = response.data;
        this.$store.commit('initAddCart', this.cart); // 更新 Vuex 状态
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    storeCart() {
      this.cart = this.$store.state.cart
    },
    storeUser() {
      this.user = this.$store.getters.getUserInfo.state.user
    }
  },
  computed: {
    cartTotalLen() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += parseInt(curVal.num)
      }, 0)
    },
    cartTotalPrice() {
      return this.cart.items.reduce((total, item) => {
        return total + item.price * item.num; // 计算每个商品的总价并累加
      }, 0).toFixed(2); // 保留两位小数
    },
    storeCart() {
      return this.$store.state.cart
    },
    storeUser() {
      return this.$store.getters.getUserInfo?.state.user ?? {}
    }
  }
}

</script>