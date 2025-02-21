<template>
  <div class="add-community">
    <h1>新增社团</h1>
    <form @submit.prevent="handleSubmit">
      <!-- 社团名称 -->
      <div class="form-group">
        <label for="name">社团名称</label>
        <input
          type="text"
          id="name"
          v-model="newCommunity.name"
          required
          placeholder="请输入社团名称"
        />
      </div>

      <!-- 社团描述 -->
      <div class="form-group">
        <label for="description">社团描述</label>
        <textarea
          id="description"
          v-model="newCommunity.description"
          placeholder="请输入社团描述"
        ></textarea>
      </div>

      <!-- 社团头像上传 -->
      <div class="form-group">
        <label for="avatar">社团头像</label>
        <input
          type="file"
          id="avatar"
          ref="avatar"
          @change="handleAvatarUpload"
          accept="image/*"
        />
        <!-- 显示图片预览 -->
        <div v-if="avatarPreview">
          <img :src="avatarPreview" alt="Avatar Preview" class="avatar-preview" />
        </div>
      </div>

      <button type="submit" class="submit-btn">创建社团</button>
    </form>
  </div>
</template>

<script>
import { createCommunity } from '../services/community_api'; // 导入 API 函数

export default {
  name: 'AddCommunity',
  data() {
    return {
      newCommunity: {
        name: '很愛社',  // 社团名称
        description: '很愛社',  // 社团描述
        avatarUrl: '',  // 用于保存头像的文件对象
      },
      avatarPreview: null,  // 头像预览
    };
  },
  methods: {
    // 处理社团头像上传并预览
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarPreview = e.target.result;  // 显示图片预览
          this.newCommunity.avatarUrl = file;  // 保存文件对象以便提交
        };
        reader.readAsDataURL(file);  // 读取图片文件
      }
    },

    // 表单提交处理
    async handleSubmit() {
      try {
        // 检查必填字段
        if (!this.newCommunity.name || !this.newCommunity.description) {
          alert('请填写完整的社团信息');
          return;
        }

        // 上传头像文件
        if (this.newCommunity.avatarUrl) {
          formData.append('avatar', this.newCommunity.avatarUrl);
        }

        // 调用 API 创建社团
        const response = await createCommunity(this.newCommunity.name, this.newCommunity.description, this.newCommunity.avatarUrl);
        console.log('社团创建成功:', response);

        // 成功后跳转至社团列表页面
        this.$router.push({ name: 'community' });
      } catch (error) {
        console.error('社团创建失败:', error);
        alert('创建社团失败，请稍后再试。');
      }
    }
  }
};
</script>

<style scoped>
.add-community {
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

input, textarea {
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

/* 头像预览样式 */
.avatar-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 10px;
}
</style>
