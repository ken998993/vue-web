<template>
  <div id="app">
    <!-- 创建职业页面 -->
    <div v-if="!jobCreated" class="job-creation">
      <h1>创建职业</h1>

      <!-- 职业名称输入框 -->
      <div class="form-group">
        <label for="jobName">职业名称:</label>
        <input 
          type="text" 
          id="jobName" 
          v-model="newJob.name" 
          placeholder="输入职业名称" 
          required
        />
      </div>

      <!-- 选择技能 -->
      <div class="skills">
        <h2>技能选择</h2>
        <div 
          v-for="(skill, index) in newJob.skills" 
          :key="index" 
          class="skill-slot"
        >
          <label :for="'skill' + index">技能 {{ index + 1 }}:</label>
          <input 
            type="text" 
            :id="'skill' + index" 
            v-model="skill.name" 
            placeholder="输入技能名称" 
            required
          />
          <input 
            type="number" 
            v-model="skill.damage" 
            placeholder="输入技能伤害" 
            min="1" 
            required
          />
          <button 
            type="button" 
            @click="removeSkill(index)"
            :disabled="newJob.skills.length === 1"
          >
            移除技能
          </button>
        </div>
        <button type="button" @click="addSkill">添加技能</button>
      </div>

      <!-- 创建职业按钮 -->
      <button @click="handleSubmit">创建职业</button>
    </div>

    <!-- 职业创建成功页面 -->
    <div v-if="jobCreated" class="job-info">
      <h1>{{ newJob.name }} 职业创建成功！</h1>
      <div class="job-details">
        <p>职业名称：{{ newJob.name }}</p>
        <p>技能：</p>
        <ul>
          <li v-for="(skill, index) in newJob.skills" :key="index">
            {{ skill.name }} - {{ skill.damage }} 点伤害
          </li>
        </ul>
      </div>
      <button @click="startBattle">开始战斗</button>
    </div>
  </div>
</template>

<script>
import { createJob } from '../services/word_game_api'; 
export default {
  name: 'CreateJob',
  data() {
    return {
      jobCreated: false,
      newJob: {
        name: '', // 默认空名称
        skills: [{ name: '', damage: 1 }] // 至少一个技能，默认伤害值为 1
      }
    };
  },
  methods: {
    // 添加新技能
    addSkill() {
      this.newJob.skills.push({ name: '', damage: 1 });
    },

    // 移除指定技能
    removeSkill(index) {
      if (this.newJob.skills.length > 1) {
        this.newJob.skills.splice(index, 1);
      }
    },

    // 创建职业并提交
    async handleSubmit() {
      // 基础验证
      if (!this.newJob.name.trim()) {
        alert('请填写职业名称');
        return;
      }
      if (this.newJob.skills.some(skill => !skill.name.trim() || skill.damage <= 0)) {
        alert('请填写完整的技能名称和有效的技能伤害值');
        return;
      }

      // 调用 createJob API 来创建职业
      try {
        const response = await createJob(this.newJob);
        console.log('职业创建成功:', response);
        this.jobCreated = true; // 更新页面状态
      } catch (error) {
        console.error('创建职业失败:', error);
        alert('创建职业失败，请重试');
      }
    },

    // 开始战斗
    startBattle() {
      alert('战斗开始！');
    }
  }
};
</script>

<style scoped>
.job-creation, .job-info {
  text-align: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.skills {
  margin-bottom: 20px;
}

.skill-slot {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
