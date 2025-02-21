<template>
  <div class="add-product">
    <h1>新增商品</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">商品名稱</label>
        <input 
          type="text" 
          id="name" 
          v-model="newProduct.name" 
          required 
          placeholder="輸入商品名稱"
        />
      </div>

      <div class="form-group">
        <label for="price">價格</label>
        <input 
          type="number" 
          id="price" 
          v-model="newProduct.price" 
          required 
          min="0" 
          placeholder="輸入商品價格"
        />
      </div>

      <div class="form-group">
        <label for="quantity">商品數量</label>
        <input 
          type="number" 
          id="quantity" 
          v-model="newProduct.quantity" 
          required 
          min="1" 
          placeholder="輸入商品數量"
        />
      </div>

      <div class="form-group">
        <label for="description">描述</label>
        <textarea 
          id="description" 
          v-model="newProduct.description" 
          placeholder="輸入商品描述"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="category">商品類別</label>
        <select 
          id="category" 
          v-model="newProduct.category" 
          required
        >
          <option value="01">電子產品</option>
          <option value="02">服飾</option>
          <option value="03">家居用品</option>
          <option value="04">美容護理</option>
        </select>
      </div>

      <div class="form-group">
        <label for="images">商品圖片</label>
        <input 
          type="file" 
          id="images" 
          ref="images" 
          @change="handleImagesUpload" 
          accept="image/*" 
          multiple
        />
        <div v-if="imagePreviews.length">
          <div v-for="(image, index) in imagePreviews" :key="index" class="image-preview-container">
            <img :src="image" alt="Image Preview" class="image-preview" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="shippingMethod">寄送方式</label>
        <select 
          id="shippingMethod" 
          v-model="newProduct.shippingMethod" 
          required
        >
          <option value="standard">標準寄送</option>
          <option value="express">快遞寄送</option>
        </select>
      </div>

      <button type="submit" class="submit-btn">新增商品</button>
    </form>
  </div>
</template>

<script>
import { addProduct } from '../services/products_api';

export default {
  name: 'AddProduct',
  data() {
    return {
      newProduct: {
        name: '新商品flower',
        price: 99,
        description: '這是一個非常棒的商品。',
        quantity: 10,
        category: '01',
        shippingMethod: 'standard',
      },
      imagePreviews: [],   // 圖片預覽
      selectedFiles: []    // 儲存 File 物件
    };
  },
  methods: {
    // 確保圖片是 File 格式
    handleImagesUpload(event) {
      const files = event.target.files;
      if (files.length > 3) {
        alert('最多只能上傳 3 張圖片');
        return;
      }

      this.imagePreviews = [];
      this.selectedFiles = []; // 存 File 物件

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);

        this.selectedFiles.push(file);  // 確保是 File 類型
        console.log('選擇的圖片:', this.selectedFiles);
      });
    },

    async handleSubmit() {
      try {
        if (!this.newProduct.name || !this.newProduct.price || this.newProduct.price <= 0) {
          alert('請填寫完整的商品資料');
          return;
        }

        const formData = new FormData();
        formData.append('name', this.newProduct.name);
        formData.append('price', this.newProduct.price);
        formData.append('description', this.newProduct.description || '');
        formData.append('quantity', this.newProduct.quantity || 1);
        formData.append('category', this.newProduct.category || '');
        formData.append('shipping_method', this.newProduct.shippingMethod || '');

        // 添加圖片
        this.selectedFiles.forEach(file => {
        console.log('選擇的圖片:', file);
        console.log('file instanceof File:', file instanceof File);
        console.log('file.name:', file.name);
        console.log('file.type:', file.type);
        console.log('file.size:', file.size);

        if (!(file instanceof File)) {
          console.error('錯誤: file 不是一個有效的 File 物件！');
          return;
        }

        formData.append('images', file); // 確保與後端一致
      });


        // 呼叫 API
        const response = await addProduct(formData);
        console.log('商品新增成功:', response);

        this.$router.push('/myStore');
      } catch (error) {
        console.error('商品新增失敗:', error);
        alert('新增商品失敗，請稍後再試。');
      }
    }
  }
};
</script>

<style scoped>
.add-product {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

textarea {
  resize: vertical;
  height: 100px;
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

/* 圖片預覽樣式 */
.image-preview-container {
  display: inline-block;
  margin-right: 10px;
}

.image-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
}
</style>
