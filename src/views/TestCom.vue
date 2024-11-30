<template>
  <div>
    <h1>购物车</h1>
    <table>
      <thead>
      <tr>
        <th><input type="checkbox" v-model="selectAll" @change="toggleSelectAll">全部选择</th>
        <th>图片</th>
        <th>名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>小计</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in cartItems" :key="item.id">
        <td><input type="checkbox" v-model="item.selected"></td>
        <td><img :src="item.image" :alt="item.name" class="product-image"></td>
        <td>{{ item.name }}</td>
        <td>{{ item.unitPrice }}</td>
        <td>
          <div class="btn-group">
            <input type="button" @click="updateQuantity(index, -1)" value="-">
            <input type="text" v-model.number="item.quantity" @blur="updateSubtotal(index)">
            <input type="button" @click="updateQuantity(index, 1)" value="+">
          </div>
        </td>
        <td>{{ item.subtotal }}</td>
        <td><input type="button" @click="removeItem(index)" value="删除"></td>
      </tr>
      </tbody>
      <tfoot>
      <tr class="total-row">
        <td colspan="7">
          <input type="button" @click="removeSelectedItems" value="删除选中项" style="float: left;margin-right: 20px;">
          <input type="button" @click="clearCart" value="清空购物车" style="float: left;">
          <span id="totalQuantity">总数: {{ totalQuantity }}个</span>
          <input type="button" class="sum" @click="calculateTotal" value="结算">
          <span id="totalAmount" style="float: right;">总计：{{ totalAmount }}</span>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectAll: false,
      cartItems: [
        { id: 1, name: '大菠萝', image: '/static/菠萝.webp', unitPrice: 123, quantity: 1, selected: false },
        { id: 2, name: '香蕉', image: '/static/香蕉.jpg', unitPrice: 456, quantity: 1, selected: false },
        { id: 3, name: '草莓', image: '/static/草莓.webp', unitPrice: 789, quantity: 1, selected: false },
        { id: 4, name: '键盘', image: '/static/键盘.webp', unitPrice: 321, quantity: 1, selected: false }
      ],
    };
  },
  computed: {
    totalQuantity() {
      return this.cartItems.reduce((total, item) => total + (item.selected ? item.quantity : 0), 0);
    },
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + (item.selected ? item.subtotal : 0), 0);
    }
  },
  methods: {
    toggleSelectAll() {
      this.cartItems.forEach(item => item.selected = this.selectAll);
      this.updateSubtotals();
    },
    updateQuantity(index, change) {
      const item = this.cartItems[index];
      item.quantity = Math.max(item.quantity + change, 1);
      this.updateSubtotal(index);
    },
    updateSubtotal(index) {
      const item = this.cartItems[index];
      item.subtotal = item.unitPrice * item.quantity;
      this.updateSubtotals();
    },
    updateSubtotals() {
      // Nothing to do here; totals are computed properties.
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    removeSelectedItems() {
      this.cartItems = this.cartItems.filter(item => !item.selected);
    },
    clearCart() {
      this.cartItems = [];
    },
    calculateTotal() {
      if (this.totalAmount === 0) {
        alert("购物车为空！");
      } else {
        alert("本次消费：" + this.totalAmount + "元");
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #e6f7ff;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

table {
  border-collapse: collapse;
  width: 80%;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #99ccff;
  color: #fff;
  font-weight: bold;
}

tr:hover {
  background-color: #b3e0ff;
}

input[type="button"] {
  background-color: #66b3ff;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-weight: bold;
}

input[type="button"]:hover {
  background-color: #3399ff;
}

input[type="text"] {
  width: 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
}

#totalQuantity, #totalAmount {
  margin-top: 5px;
  font-weight: bold;
}

.total-row {
  background-color: #f9f9f9;
  font-size: 1.1em;
}

.total-row .sum {
  float: right;
  width: 150px;
  margin-left: 30px;
  background-color: red;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 5px;
}
</style>