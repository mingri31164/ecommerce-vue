<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title card-header-title">购物车</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLen && isUserLoggedIn">
          <thead>
          <tr>
            <td><input class="check" type="checkbox" v-model="isAllChecked" @change="toggleAllItems">全部选择</td>
            <th>商品名称</th>
            <th>商品图片</th>
            <th>单价</th>
            <th>数量</th>
            <th>总计</th>
            <th>操作</th>
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

      <div class="column is-12 box" style="z-index: 1000000000">
        <h2 class="subtitle">总价：<span style="color: red;font-weight: 600;
        font-size: 1.5vw;">￥{{ cartTotalPrice.toFixed(2) }}</span></h2>
        <hr>
        <button class="button is-dark" @click="generateOrder()" style="width: 6vw;z-index: 100000">购买</button>
        <button class="button is-danger" @click="clearCart()" style="float: right">清空购物车</button>
        <button class="button is-warning" @click="removeSelectedItems()"
                style="float: right;margin-right: 1vw">删除选中商品</button>
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
      cartList: [],
    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.getUserInfo.state.user.userId !== '';
    },
    cartTotalLen() {
      return this.cart.items.reduce((acc, curVal) => acc + parseInt(curVal.num), 0);
    },
    isAllChecked: {
      get() {
        return this.cart.items.length > 0 && this.cart.items.every(item => item.checked);
      },
      set(value) {
        this.cart.items.forEach(item => {
          item.checked = value; // 更新每个商品的选中状态
        });
      }
    }
  },
  mounted() {
    this.getCartItem();
    document.title = "Shopping";
  },
  methods: {
    toggleAllItems() {
      this.updateTotalPrice();
    },
    async removeSelectedItems() {
      if (!this.cartList.length) {
        alert("请选择商品");
        return;
      }
      if (confirm('是否删除选中商品？')){
        const userId = this.$store.getters.getUserInfo.state.user.userId;
        const selectedItems = this.cart.items.filter(item => item.checked);

        for (const item of selectedItems) {
          await this.removeCartItem(item, userId);
        }
        this.isAllChecked
        this.updateTotalPrice(); // 更新总价
        location.reload()
      }
    },
    async removeCartItem(item, userId) {
      try {
        const response = await axios.get('/api/cart/deleteById', {
          params: {
            userId: userId,
            cartId: item.cardid // 传递商品ID
          }
        });
        this.cart.items = response.data; // 更新购物车内容
      } catch (error) {
        console.error("删除商品失败:", error.message);
      }
    },
    async clearCart() {
      if (confirm('是否清空购物车？')){
        const userId = this.$store.getters.getUserInfo.state.user.userId;

        // 遍历所有商品并逐个删除
        for (const item of this.cart.items) {
          await this.removeCartItem(item, userId);
        }
        this.updateTotalPrice(); // 更新总价
      }
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
    async generateOrder() {
      if (confirm('确定购买？')){
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
          this.$router.push('/');
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  }
}
</script>

<style scoped>
.page-cart {
  padding: 20px;
}
</style>