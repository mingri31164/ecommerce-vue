<template>
  <tr>
    <td><input class="check" type="checkbox" v-model="item.checked" @change="checkItem()"></td>
    <td style="width: 20%;">{{ item.name }}</td>
    <td><img :src="'http://10.60.81.45:8080/' + item.thumbnail" alt="产品图片" style="width: 3vw; height: auto"></td>
    <td>￥{{ item.price }}</td>
    <td>
<!--      数量-->
<!--      <button @click="decrementnum(item)" style="padding: 0 8px">-</button>-->
<!--      <input type="number" v-model="item.num" min="1" style="width: 30px; text-align: center;" @input="updateCart()" />-->
<!--      <button @click="incrementnum(item)" style="padding: 0 8px">+</button>-->
      {{item.num}}
    </td>
    <td>￥{{ getItemTotal(item).toFixed(2) }}</td>
    <td><button class="delete" @click="removeCartItem(item)"></button></td>
  </tr>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    initialItem: Object
  },
  data() {
    return {
      item: this.initialItem
    };
  },
  methods: {
    getItemTotal(item) {
      return item.num * item.price;
    },
    incrementnum(item) {
      item.num++;
      this.updateCart();
    },
    decrementnum(item) {
      if (item.num > 1) {
        item.num--;
        this.updateCart();
      }
    },
    updateCart() {
      this.$emit('updateTotalPrice');
    },
    removeCartItem(item) {
      this.$emit('removeCartItem', item);
      this.updateCart();
    },
    checkItem() {
      this.$emit('updateTotalPrice');
    }
  },
}
</script>

<style scoped>
td {
  vertical-align: middle !important;
}
</style>