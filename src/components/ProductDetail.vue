<template>
  <div class="page-container">
    <div class="product-detail">
      <img :src="productImage" alt="商品图片" class="product-image" v-if="product" />
      <div class="product-info">
        <h1 v-if="product" class="product-title">{{ product.name }}</h1>
        <p v-if="product" class="product-description">{{ product.description || '暂无描述' }}</p>
        <h2 v-if="product" class="product-price">价格: ￥{{ product.price1 }}</h2>
        <div class="product-actions">
          <div class="quantity-control">
            <span>数量：</span>
            <button @click="decreaseQuantity">-</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity">+</button>
          </div>
          <button @click="addToCart(product)" class="add-to-cart">加入购物车</button>
          <button class="buy-now">现在购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null, // 当前商品信息
      quantity: 1,   // 商品数量，初始值为 1
    };
  },
  computed: {
    productImage() {
      return this.product
          ? `http://10.60.81.45:8080/${this.product.pthumbnail}`
          : '';
    }
  },
  mounted() {
    this.getProductDetails();
  },
  methods: {
    // 减少数量
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      } else {
        alert("数量不能少于1！");
      }
    },
    // 增加数量
    increaseQuantity() {
      this.quantity++;
    },
    async getProductDetails() {
      try {
        const productId = this.$route.params.id;
        const response = await axios.get('/api/goods/list');
        const allProducts = response.data;
        this.product = allProducts.find((item) => item.id === productId);

        if (!this.product) {
          alert('商品未找到！');
          this.$router.push('/');
        }
      } catch (error) {
        console.error('加载商品信息失败', error);
        alert('加载商品信息失败，请稍后重试。');
      }
    },
    async addToCart(product) {
      const userId = this.$store.getters.getUserInfo.state.user.userId;
      if (!userId) {
        alert('未登录！请先登录。');
        this.$router.push('/login');
        return;
      }
      try {
        await axios.get("/api/cart/add", {
          params: {
            userId,
            goodsId: product.id,
            num: 1,
            price: product.price1,
          }
        });
        alert('添加成功！');
      } catch (error) {
        console.error('添加到购物车失败', error);
        alert('添加到购物车失败，请稍后重试。');
      }
    },
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 83.5vh;
  padding: 0 20px;
}

.product-detail {
  display: flex;
  padding: 40px;
  width: 90%;
  max-width: 90vw;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.product-image {
  width: 50%;
  object-fit: contain;
}

.product-info {
  //background-color: red;
  margin-left: 1vw;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  //justify-content: center;
}

.product-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}

.product-price {
  font-size: 1.5rem;
  color: #e60023;
  margin-bottom: 20px;
}

.product-actions {
  //display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.add-to-cart {
  padding: 10px 20px;
  background-color: #2D9CDB;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.buy-now {
  padding: 10px 20px;
  background-color: #fff;
  color: #2D9CDB;
  border: 2px solid #2D9CDB;
  border-radius: 5px;
  cursor: pointer;
}
</style>
