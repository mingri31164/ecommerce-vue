<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title card-header-title">购物车</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLen && this.$store.getters.getUserInfo.state.user.userId !== ''">
          <thead>
          <tr>
            <td><input class="check" type="checkbox">全选</td>
            <th>商品名称</th>
            <th>商品图片</th>
            <th>单价</th>
            <th>数量</th>
            <th>总计</th>
            <th></th>
          </tr>
          </thead>
          <CartItem
              v-for="item in cart.items"
              :key="item.cardid"
              :initialItem="item"
              @removeCartItem="removeCartItem"
              @updateTotalPrice="updateTotalPrice"
          />
        </table>

        <p v-else>你的购物车是空的</p>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">总价：￥{{ cartTotalPrice.toFixed(2) }}</h2>
        <hr>
        <button class="button is-dark" @click="generateOrder()">购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CartItem from '../components/CartItem.vue'

export default {
  name: 'CartPage',
  components: {
    CartItem
  },
  data() {
    return {
      cart: {
        items: []
      },
      cartTotalPrice: 0,
      cartList: []
    }
  },
  mounted() {
    this.getCartItem();
    document.title = "Shopping";
  },
  methods: {
    removeItem(item) {
      this.cart.items = this.cart.items.filter(i => i.cardid !== item.cardid);
      alert("删除成功");
    },
    updateTotalPrice() {
      this.cartTotalPrice = 0;
      this.cartList = []; // 重置 cartList
      this.cart.items.forEach(item => {
        if (item.checked) {
          this.cartTotalPrice += item.price * item.num;
          this.cartList.push(item.cardid); // 更新选中商品列表
        }
      });
    },
    async getCartItem() {
      await axios.get("/api/cart/listByUser", {
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
    async removeCartItem(item) {
      await axios.get('/api/cart/deleteById', {
        params: {
          userId: this.$store.getters.getUserInfo.state.user.userId,
          cartId: item.cardid
        }
      })
          .then(response => {
            this.cart.items = response.data;
          })
          .catch(err => {
            console.log(err.message);
          });
      this.$store.commit('initAddCart', this.cart);
    },
    async generateOrder() {
      if (!this.cartList.length) {
        alert("请选择商品");
        return;
      }

      try {
        const userId = this.$store.getters.getUserInfo.state.user.userId;
        const cartList = this.cartList.join(',');

        const response = await axios.get('/api/order/addCastOrder', {
          params: {
            userId,
            cartList
          }
        });

        alert("购买成功");
        console.log(response.data); // 处理返回的订单数据
        this.$router.push('/')
      } catch (err) {
        console.log(err.message);
      }
    }
  },
  computed: {
    cartTotalLen() {
      return this.cart.items.reduce((acc, curVal) => acc + parseInt(curVal.num), 0);
    }
  }
}
</script>

<style scoped>
.page-cart {
  padding: 20px;
}
</style>