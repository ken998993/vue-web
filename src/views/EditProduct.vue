<template>
  <div class="edit-product">
    <h1>編輯商品</h1>
    <form @submit.prevent="handleSubmit">
      <!-- 商品名稱欄位 -->
      <div class="form-field">
        <label for="name">商品名稱</label>
        <input 
          v-model="editedProduct.name" 
          type="text" 
          id="name" 
          required 
          placeholder="輸入商品名稱" 
        />
      </div>
      
      <!-- 商品價格欄位 -->
      <div class="form-field">
        <label for="price">價格</label>
        <input 
          v-model="editedProduct.price" 
          type="number" 
          id="price" 
          required 
          min="0" 
          placeholder="輸入商品價格" 
        />
      </div>
      
      <!-- 商品數量欄位 -->
      <div class="form-field">
        <label for="quantity">商品數量</label>
        <input 
          v-model="editedProduct.quantity" 
          type="number" 
          id="quantity" 
          required 
          min="1" 
          placeholder="輸入商品數量" 
        />
      </div>
      
      <!-- 商品描述欄位 -->
      <div class="form-field">
        <label for="description">描述</label>
        <textarea 
          v-model="editedProduct.description" 
          id="description" 
          placeholder="輸入商品描述"
        ></textarea>
      </div>

      <!-- 商品圖片欄位 -->
      <div class="form-field">
        <label for="image_urls">商品圖片</label>
        <input 
          type="file" 
          id="image_urls" 
          @change="handleFileChange" 
          multiple 
        />
        <div v-if="editedProduct.image_urls.length > 0">
          <div v-for="(file, index) in editedProduct.image_urls" :key="index">
            <img :src="getImageUrl(file)" alt="商品圖片" class="product-image" />
          </div>
        </div>
      </div>

      <button type="submit" class="submit-btn">提交修改</button>
    </form>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore';  // 引入Pinia Store
import { editProduct } from '../services/products_api';  // 假设有更新商品API

export default {
  name: 'EditProduct',
  data() {
    return {
      editedProduct: {
        id: null,
        name: '',
        price: 0,
        description: '',
        quantity: 1,
        image_urls: []  // 存储商品图片
      }
    };
  },
  created() {
    const productStore = useProductStore();
    const product = productStore.getEditingProduct[0];  // 獲取當前編輯商品
    console.log('product',product)
    if (product) {
      // 填充表单数据
      this.editedProduct = { ...product };
    } else {
      // 处理无商品的情况
      console.error("没有找到商品数据");
    }
  },
  methods: {
    async handleSubmit() {
      try {
        // 檢查必填欄位
        if (!this.editedProduct.name || !this.editedProduct.price || this.editedProduct.price <= 0) {
          alert('請填寫完整的商品資料');
          return;
        }

        // 構建 FormData 格式
        const formData = new FormData();
        formData.append('id', this.editedProduct.id);
        formData.append('name', this.editedProduct.name);
        formData.append('price', this.editedProduct.price);
        formData.append('description', this.editedProduct.description || '');
        formData.append('quantity', this.editedProduct.quantity || 1);
        formData.append('category', this.editedProduct.category || '');
        formData.append('shipping_method', this.editedProduct.shippingMethod || '');

        // 添加圖片檔案 (最多三張)
        if (this.editedProduct.image_urls.length > 0) {
          this.editedProduct.image_urls.forEach(file => {
            formData.append('images', file);
          });
        }

        // 不需要手動設置 Content-Type，瀏覽器會自動設置為 multipart/form-data
        const response = await editProduct(formData);
        console.log('商品修改成功:', response);

        // 成功後跳回商品列表頁面
        this.$router.push('/myStore');
      } catch (error) {
        console.error('商品新增失敗:', error);
        alert('新增商品失敗，請稍後再試。');
      }
  },

    // 处理图片选择
    handleFileChange(event) {
      const files = event.target.files;
      if (files) {
        this.editedProduct.image_urls = Array.from(files);  // 存储新选择的图片
      }
    },

    // 获取图片的完整路径
    getImageUrl(imagePath) {
      return `http://localhost:5001/${imagePath}`;  // 假设你的后端 URL 是这样
    }
  }
};
</script>

<style scoped>
.edit-product {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-field {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

input[type="text"], input[type="number"], textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  height: 100px;
  resize: none;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin: 5px;
}

.submit-btn {
  background-color: #2ecc71;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #27ae60;
}
</style>
