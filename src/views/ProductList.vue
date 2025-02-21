<template>
  <div class="product-list">
    <!-- 我的卖场链接 -->
    <div class="store-link">
      <router-link to="/mystore" class="store-link-btn">我的卖场</router-link>
    </div>

    <h1>商品列表</h1>
    <div class="products">
      <!-- 使用 v-for 遍历每个商品，并显示详细信息 -->
      <div class="product-card" v-for="product in products" :key="product.id">
        <!-- 删除按钮 -->
        <button @click="deleteProduct(product.id)" class="delete-btn">X</button>
        
        <!-- 检查 image_urls 是否存在，并显示图片 -->
        <div v-if="product.image_urls && product.image_urls.length > 0">
          <img 
             :src="product.real_image_urls"
              alt="商品图片" 
              class="product-image" 
          />
        </div>
        <!-- :src="getImageUrl(product.image_urls[0])"  -->
        <div class="product-info">
          <div><strong>商品名:</strong> {{ product.name }}</div>
          <div><strong>价格:</strong> ¥{{ product.price.toFixed(2) }}</div>
          <div v-if="product.description"><strong>描述:</strong> {{ product.description }}</div>
          <div><strong>库存:</strong> {{ product.quantity }} 件</div> <!-- 显示库存数量 -->
        </div>
        
        <button @click="addToCart(product)" class="add-to-cart-btn">
          加入购物车
        </button>
        
        <!-- 每个商品的上下分隔线 -->
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { getProducts, deleteProduct,getImage } from '../services/products_api';  // 假设你有一个API来获取商品列表
import { useProductStore } from '../stores/productStore';  // 引入 Pinia Store

export default {
  name: 'ProductList',
  data() {
    return {
      products: []  // 用来存储从后端获取的商品数据
    };
  },
  created() {
    this.loadProducts();  // 在组件创建时调用 loadProducts 方法获取商品列表
  },
  methods: {
    // 获取商品数据，并同时更新组件和 Pinia store
    async loadProducts() {
      try {
        const response = await getProducts();  // 获取商品数据
        console.log("Products data:", response);

        // 更新组件的 products 数据
        this.products = response;

        // 获取 Pinia Store 实例
        const productStore = useProductStore();

        // 将获取到的商品数据存储到 Pinia store 中
        productStore.setProducts(response);
      } catch (error) {
        console.error('Error fetching products!', error);  // 错误处理
      }
    },

    // 获取图片的完整路径
    getImageUrl(imagePath) {
      console.log('imagePat-----圖片', imagePath);

      // 調用 getImage 方法並返回圖片 URL
      return getImage(imagePath)
        .then(imageUrl => {
          console.log('取得圖片 URL:', imageUrl);
          return imageUrl;
        })
        .catch(error => {
          console.error('獲取圖片失敗:', error);
          return `http://localhost:5001/${imagePath}`;  // 假设你的后端 URL 是这样
        });
    },

    // 将商品添加到购物车
    addToCart(product) {
      const productStore = useProductStore(); // 获取 Pinia store
      const cartProducts = productStore.cartProducts; // 获取购物车中的商品列表

      // 查找购物车中是否已有该商品
      const existingProduct = cartProducts.find(item => item.id === product.id);

      if (existingProduct) {
        // 如果该商品已存在，增加数量并检查库存
        const newQuantity = existingProduct.quantity + 1;
        if (newQuantity <= product.quantity) {
          existingProduct.quantity = newQuantity;
          existingProduct.price = product.price * existingProduct.quantity;  // 更新总价格
        } else {
          alert('该商品库存不足!');
        }
      } else {
        // 如果该商品不存在，添加到购物车
        if (product.quantity > 0) {
          const newProduct = { ...product, quantity: 1 }; // 添加数量属性
          productStore.addToCart(newProduct); // 调用 store 中的 addToCart 方法
        } else {
          alert('该商品库存不足!');
        }
      }

      console.log('Added to cart:', product);
    },

    // 删除商品
    async deleteProduct(productId) {
      try {
        const response = await deleteProduct(productId);
        this.products = this.products.filter((product) => product.id !== productId);
        console.log("Product deleted:", response);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  }
};
</script>

<style scoped>
.product-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  min-height: 100vh;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;  /* 控制每行最多放三列商品 */
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.product-card {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 8px;
  width: 30%;  /* 每行三个商品 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  position: relative;  /* 为了定位删除按钮 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.info-details {
  display: flex;
  flex-direction: column;
  color: #333;
}

.info-row {
  margin: 5px 0;
}

strong {
  font-weight: 600;
  color: #333;
}

/* 删除按钮样式 */
.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-btn:hover {
  background-color: darkred;
}

/* 加入购物车按钮样式 */
.add-to-cart-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}

/* Responsive Design: For mobile view */
@media (max-width: 768px) {
  .product-card {
    width: 48%;  /* 当屏幕较小的时候，每行展示2个商品 */
  }
}

@media (max-width: 480px) {
  .product-card {
    width: 100%;  /* 更小的屏幕时，每行展示1个商品 */
  }
}

/* 我的卖场链接样式 */
.store-link-btn {
  font-size: 1.2rem;
  text-decoration: none;
  color: #3498db;
  margin-bottom: 20px;
  transition: color 0.3s;
}

.store-link-btn:hover {
  color: #2980b9;
}
</style>
