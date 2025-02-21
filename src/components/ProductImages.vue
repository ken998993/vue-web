<template>
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
</template>

<script>
export default {
  name: 'ProductImages',
  props: {
    modelValue: Array
  },
  data() {
    return {
      imagePreviews: []
    };
  },
  watch: {
    modelValue(newVal) {
      this.imagePreviews = newVal.map(file => URL.createObjectURL(file));
    }
  },
  methods: {
    handleImagesUpload(event) {
      const files = event.target.files;
      this.$emit('update:modelValue', Array.from(files));
    }
  }
};
</script>

<style scoped>
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
