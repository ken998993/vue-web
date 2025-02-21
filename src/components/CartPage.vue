<template>
  <div class="cart-page" v-if="isCartWindowVisible">
    <!-- 购物车头部 -->
    <div class="cart-header">
      <h2>购物车</h2>
      <button @click="closeCartPage">关闭</button>
    </div>

    <!-- 购物车商品列表 -->
    <div class="cart-items">
      <ul>
        <li v-if="cartItems.length === 0">购物车为空</li>
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="getImageUrl(item.image_urls[0])" alt="商品图片" class="cart-item-image" />
          <div class="cart-item-details">
            <p class="cart-item-name">{{ item.name }}</p>
            <p class="cart-item-price">￥{{ item.price }}</p>
            <button @click="removeItemFromCart(item.id)" class="remove-item-btn">删除</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- 购物车操作 -->
    <div class="cart-actions">
      <p v-if="cartItems.length > 0" class="total-price">总价：￥{{ totalPrice }}</p>
      <button v-if="cartItems.length > 0" @click="checkout" class="checkout-btn">结账</button>
      <button v-else class="checkout-btn disabled" disabled>结账</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';  // 引入 Vue 的 computed API
import { useProductStore } from '../stores/productStore';  // 引入 Pinia store

export default {
  name: 'CartPage',
  props: {
    isCartWindowVisible: {
      type: Boolean,
      required: true,
    },
    toggleCartWindow: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    // 使用 Pinia store 获取购物车数据
    const productStore = useProductStore();

    // 购物车商品列表
    const cartItems = computed(() => productStore.cartProducts);

    // 计算购物车的总价
    const totalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.price, 0).toFixed(2);
    });

    // 获取图片路径的方法
    const getImageUrl = (imagePath) => {
      return `http://localhost:5001/${imagePath}`;  // 假设图片路径是这样
    };

    // 关闭购物车窗口
    const closeCartPage = () => {
      props.toggleCartWindow();
    };

    // 删除购物车中的商品
    const removeItemFromCart = (itemId) => {
      productStore.cartProducts = productStore.cartProducts.filter(item => item.id !== itemId); // 从 store 中删除
    };

    // 进行结账操作
    const checkout = () => {
      if (cartItems.value.length > 0) {
        alert(`正在结账，支付金额：￥${totalPrice.value}`);
        productStore.cartProducts = []; // 清空购物车
      }
    };

    return {
      cartItems,
      totalPrice,
      closeCartPage,
      removeItemFromCart,
      checkout,
      getImageUrl,  // 将 getImageUrl 方法暴露到模板中
    };
  },
};
</script>

<style scoped>
.cart-page {
  position: fixed;
  top: 50px;
  right: 20px;
  width: 400px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 9999;
  overflow: hidden;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3498db;
  color: white;
  padding: 15px;
}

.cart-header h2 {
  margin: 0;
}

.cart-header button {
  background-color: #e74c3c;
  border: none;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.cart-header button:hover {
  background-color: #c0392b;
}

.cart-items {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.cart-items ul {
  list-style-type: none;
  padding-left: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  object-fit: cover;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.cart-item-price {
  font-size: 16px;
  color: #3498db;
}

.remove-item-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.remove-item-btn:hover {
  background-color: #c0392b;
}

.cart-actions {
  padding: 15px;
  background-color: #f7f7f7;
  text-align: center;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
}

.checkout-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
}

.checkout-btn:hover {
  background-color: #2980b9;
}

.checkout-btn.disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>
