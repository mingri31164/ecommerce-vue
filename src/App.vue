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


        <div class="navbar-end">
          <!-- <router-link to="/laptop" class="navbar-item">Laptop</router-link>
          <router-link to="/pc" class="navbar-item">PC</router-link> -->

          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button is-white" v-if="!user.userId">登录</router-link>

              <div class="user" v-else>
                <div class="dropdown is-right mx-3 is-active">
                  <div class="dropdown-trigger">
                    <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span>账号：{{ user.name }}</span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <router-link class="dropdown-item" to="/order">
                        <span>订单</span>
                      </router-link>
                      <a class="dropdown-item" @click="logout()">
                        <span>注销</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <button class="button is-white" @click="goToCart()">
                <span>购物车</span>
              </button>
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
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: []
      },
      user: this.$store.getters.getUserInfo?.state.user ?? {},
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
    // this.getCartItem()
  },
  methods: {
    logout() {
      this.$store.dispatch('removeUserInfo');
      this.user = this.$store.getters.getUserInfo.state.user ?? {};
      this.getCartItem()
      this.$router.push('/login');
    },

    goToCart() {
      if (!this.user.userId) {
        alert('未登录！请先登录。');
        this.$router.push('/login'); // 跳转到登录页面
      } else {
        this.$router.push('/cart'); // 已登录，跳转到购物车
      }
    },

    async getCartItem() {
      await axios
        .get("/api/cart/listByUser", {
          params: {
            userId: this.user.userId
          }
        })
        .then(response => {
          this.cart.items = response.data
        })
        .catch(error => {
          console.log(error);
        })
      this.$store.commit('initAddCart', this.cart)
    },
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