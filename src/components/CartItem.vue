<template>
  <tr>
    <td><input class="check" type="checkbox" v-model="item.checked" @change="checkItem()"></td>
    <td style="width: 20%;">{{ item.name }}</td>
    <td><img :src="'http://10.60.81.45:8080/' + item.thumbnail" alt="产品图片" style="width: 3vw; height: auto"></td>
    <td>￥{{ item.price }}</td>
    <td>{{ item.num }}</td>
    <td style="color: red;font-weight: 600">￥{{ getItemTotal(item).toFixed(2) }}</td>
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
    updateCart() {
      this.$emit('updateTotalPrice');
    },
    removeCartItem(item) {
      this.$emit('removeCartItem', item);
      this.updateCart();
    },
    checkItem() {
      this.updateCart();
    }
  },
}
</script>

<style scoped>
td {
  vertical-align: middle !important;
}
</style>