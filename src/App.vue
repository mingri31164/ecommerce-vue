<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
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
                  v-if="cartTotalLen > 0"
                  style="position: absolute; top: 1.5vh; left: 1.7vw; width: 20px; height: 20px;
                     background-color: red; border-radius: 50%; color: white;
                     display: flex; align-items: center; justify-content: center; font-size: 12px;">
                {{ cartTotalLen }}
                </div>

              <!-- 下拉购物车内容 -->
              <div
                  class="cart-dropdown"
                  style="position: absolute; top: 6vh; right: 0; background: white;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 22vw;
                  border-radius: 5px; z-index: 1000; max-height: 58vh;
                  overflow-y: auto; display: flex; flex-direction: column;">
                <!-- 商品列表部分 -->
                <div style="flex: 1; overflow-y: auto;">
                  <div class="tab-item" v-for="item in cart.items" :key="item.id" style="padding: 10px;
                   border-bottom: 1px solid #eee;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <img :src="'http://10.60.81.45:8080/' + item.thumbnail" alt="商品图片"
                           style="width: 80px; height: 80px;
                           object-fit: cover; min-width: 80px; min-height: 80px;">
                      <div style="flex: 1; margin-left: 20px;">
                        <p style="font-size: 11px; color: #5079d9; font-weight: 500;">{{ item.name }}</p>
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
              border-top: 1px solid #eee; background-color: white;
              position: sticky; bottom: 0;">
                  <span style="color: rgb(153, 153, 153); font-size: 90%;
                  display: flex;">共{{cartTotalLen}}件商品</span>
                  <span style="font-size: 110%;float: left">合计：
                    <span style="color: red;font-weight: 700">
                    <span>
                      <span style="font-size: 80%">¥</span>
                      <span style="font-size: 140%"> 532</span>
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


            </div>
          </div>


              <router-link to="/login" class="button is-white" v-if="!user.userId">登录</router-link>

              <div class="user" v-else>
                <div class="dropdown is-right mx-3 is-active">
                  <div class="dropdown-trigger" style="color: #b0b0b0;
                  width: 5.5vw; height: 5vh;overflow: hidden;">
                    <span aria-haspopup="true" aria-controls="dropdown-menu">
                      <span style="display: flex;align-items: center;margin-top: 2vh">
                        <img src="./assets/用户-实色.png" style="width: 35%; height: 30%;">
                        <span class="user-name" style="margin-left: 0.2vw;font-size: 21px;">{{ user.name }}</span>
                      </span>
                    </span>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <router-link class="dropdown-item" to="/order">
                        <span style="margin-left: 60px">订单</span>
                      </router-link>

                      <a class="dropdown-item" @click="logout()" style="margin-left: 60px">
                        <span>注销</span>
                      </a>
                    </div>
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
    }
  },
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js';
    script.async = true; // 异步加载
    document.body.appendChild(script);
    this.cart = this.$store.state.cart
    this.getCartItem()
  },
  methods: {
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
    storeCart() {
      return this.$store.state.cart
    },
    storeUser() {
      return this.$store.getters.getUserInfo?.state.user ?? {}
    }
  }
}

</script>