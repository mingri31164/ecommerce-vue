<template>
  <div class="page-order">
    <div class="columns is-multiline">
      <h1 class="title card-header-title">订单</h1>
      <div class="column is-2">
        <el-select v-model="sortOption" @change="sortOrders" placeholder="请选择排序方式">
          <el-option label="默认" value="default"></el-option>
          <el-option label="按创建时间升序" value="timeAsc"></el-option>
          <el-option label="按创建时间降序" value="timeDesc"></el-option>
          <el-option label="按商品总价升序" value="priceAsc"></el-option>
          <el-option label="按商品总价降序" value="priceDesc"></el-option>
        </el-select>
      </div>
    </div>

    <div class="column is-12 box">
      <div class="is-fullwidth">
        <OrderItem
            v-for="order in sortedOrders"
            :key="order.id"
            :initialOrder="order" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'orderPage',
  components: {
    OrderItem,
  },
  data() {
    return {
      orders: [],
      sortOption: 'default',
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    async getOrders() {
      await axios
          .get('/api/order/listByUser', {
            params: {
              userId: this.$store.getters.getUserInfo.state.user.userId
            }
          })
          .then(response => {
            this.orders = response.data
          })
          .catch(err => {
            console.log(err.message);
          })
    },
    calculateTotal(orderDetails) {
      return orderDetails.reduce((acc, curVal) => {
        return acc += parseFloat(curVal.goodsPrice) * parseInt(curVal.goodsNums);
      }, 0);
    }
  },
  computed: {
    sortedOrders() {
      let sorted = [...this.orders];
      switch (this.sortOption) {
        case 'timeAsc':
          return sorted.sort((a, b) => new Date(a.orderTime) - new Date(b.orderTime));
        case 'timeDesc':
          return sorted.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
        case 'priceAsc':
          return sorted.sort((a, b) => this.calculateTotal(a.orderDetail) - this.calculateTotal(b.orderDetail));
        case 'priceDesc':
          return sorted.sort((a, b) => this.calculateTotal(b.orderDetail) - this.calculateTotal(a.orderDetail));
        default:
          return sorted;
      }
    },

  }
}
</script>
