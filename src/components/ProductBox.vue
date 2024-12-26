<template>
  <div class="column is-3" @click="goToDetail"
       style="display: flex; justify-content: center; align-items: flex-start; padding: 10px;">
    <div class="box" style="width: 300px; height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
      <figure class="image mb-4" style="width: 100%; height: 220px; overflow: hidden;">
        <img :src="'http://10.60.81.180:8080/' + good.pthumbnail" style="width: 100%; height: auto;">
      </figure>
      <span class="is-size-6" style="font-weight: 400">{{ good.name }}</span>
      <span class="is-size-7" style="color: #b0b0b0;font-size: 12px">这是一台 | {{ good.name }}</span>
      <h5 class="is-size-5" style="color: red; font-weight: bold">￥{{ good.price1 }}</h5>
      <!-- <button id="btn_add" @click="addToCart(good)" style="width: 100%;">加入购物车</button> -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    },
    data() {
        return {
            good: this.product,
            user: this.$store.getters.getUserInfo?.state.user ?? {},
        }
    },
    methods: {
      goToDetail() {
        this.$router.push(`/product/${this.product.id}`);
      },
        addToCart(good) {
          if (!this.user.userId) {
            alert('未登录！请先登录。');
            this.$router.push('/login'); // 跳转到登录页面
          } else {
            this.$emit('addToCart', good)
          }

        }
    }
}
</script>

<style scoped>
.box{
  transition: box-shadow 0.3s ease; /* 添加平滑过渡效果 */
  border-radius: 10px; /* 设置圆润边框，调整值以获得所需的圆度 */
}
.box:hover{
  box-shadow: 0 0 10px blue; /* 红色光晕边框 */
  color: red;
}
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}

.box-operator {
    margin-left: -1.25rem;
    margin-right: -1.25rem;
}

.box-operator .button {
    /* padding: 0 8px; */
}

#btn_add {
    width: 100%;
    margin: auto 0;
    text-align: center;
    background-color: #000000;
    /* Green */
    border: none;
    color: rgb(255, 255, 255);
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    /* display: inline-block; */
    display: block;
    font-size: 16px;
    margin: 4px auto;
    -webkit-transition-duration: 0.4s;
    /* Safari */
    transition-duration: 0.4s;
    cursor: pointer;
}
</style>