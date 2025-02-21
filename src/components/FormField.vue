<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    
    <!-- 文字輸入框 -->
    <input 
      v-if="type === 'text'"
      :id="id" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      :placeholder="placeholder"
      :required="required"
    />
    
    <!-- 數字輸入框 -->
    <input 
      v-if="type === 'number'" 
      type="number"
      :id="id" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      :min="min" 
      :placeholder="placeholder"
      :required="required"
    />
    
    <!-- textarea -->
    <textarea 
      v-if="type === 'textarea'"
      :id="id" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      :placeholder="placeholder"
      :required="required"
    ></textarea>
    
    <!-- select -->
    <select 
      v-if="type === 'select'"
      :id="id" 
      v-model="modelValue"
      :required="required"
    >
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>


<script>
export default {
  props: {
    label: { type: String, required: true },
    type: { type: String, default: 'text' },
    modelValue: { type: [String, Number], required: true },  // 接收父組件的值
    required: { type: Boolean, default: false },
    min: { type: Number, default: 0 },
    placeholder: { type: String, default: '' }
  }
};
</script>

<style scoped>
/* 你的樣式 */
</style>
