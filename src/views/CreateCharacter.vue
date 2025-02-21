<template>
  <div id="app">
    <!-- 角色创建页面 -->
    <div v-if="!characterCreated" class="character-creation">
      <h1>创建角色</h1>

      <!-- 角色名字输入框 -->
      <div class="name-selection">
        <label for="name">角色名字:</label>
        <input type="text" v-model="character.name" placeholder="输入角色名字" />
      </div>

      <!-- 选择职业 -->
      <div class="job-selection">
        <label for="job">选择职业:</label>
        <select v-model="character.jobs" @change="updateSkills">
          <option v-for="job in jobs" :key="job.id" :value="job.id">
            {{ job.name }}
          </option>
        </select>
      </div>

      <!-- 职业头衔输入框 -->
      <div class="job-title-selection">
        <label for="jobTitle">职业头衔:</label>
        <input type="text" v-model="character.jobTitle" placeholder="输入职业头衔" />
      </div>

      <!-- 选择技能 -->
      <div class="skills">
        <h2>技能选择</h2>
        <div v-for="(skill, index) in selectedSkills" :key="index" class="skill-slot">
          <label :for="'skill' + index">技能 {{ index + 1 }}:</label>
          <select v-model="character.skills[index].name">
            <option v-for="skillOption in skill.options" :key="skillOption.name" :value="skillOption.name">
              {{ skillOption.name }}
            </option>
          </select>
          <span>伤害：{{ skill.selected.damage }}</span>
        </div>
      </div>

      <!-- 头像选择 -->
      <div class="avatar-selection">
        <h3>选择头像</h3>
        <input type="file" @change="handleImageUpload" />
        <img v-if="character.avatar" :src="character.avatar" alt="Character Avatar" class="avatar-preview" />
      </div>

      <!-- 创建角色按钮 -->
      <button @click="createCharacter">创建角色</button>

      <!-- 创建职业按钮 -->
      <button @click="navigateToJobCreation">创建职业</button>
    </div>

    <!-- 角色创建后 -->
    <div v-if="characterCreated" class="character-info">
      <h1>{{ character.name }}的资料</h1>
      <div class="avatar">
        <img :src="character.avatar" alt="Character Avatar" class="avatar-preview" />
      </div>
      <div class="character-details">
        <p>职业：{{ character.job }}</p>
        <p>职业头衔：{{ character.jobTitle }}</p>
        <p>技能：</p>
        <ul>
          <li v-for="(skill, index) in character.skills" :key="index">
            {{ skill.name }} - {{ skill.damage }} 点伤害
          </li>
        </ul>
      </div>
      <button @click="startBattle">开始战斗</button>
    </div>
  </div>
</template>

<script>
import { createCharacter, fetchJobs } from '../services/word_game_api';
import { useRouter } from 'vue-router';

export default {
  name: 'Game',
  data() {
    return {
      characterCreated: false,
      character: {
        name: '勇士',
        jobs: '', // 选中的职业 ID
        skills: '',
        avatar: '',
      },
      selectedSkills: [], // 用于动态渲染技能选择
      jobs: [], // 用于存储从 API 获取的职业列表
    };
  },
  setup() {
    const router = useRouter();

    const navigateToJobCreation = () => {
      router.push('/createJobs');
    };

    return {
      navigateToJobCreation,
    };
  },
  methods: {
    async fetchJobsData() {
      try {
        const jobs = await fetchJobs(); // 调用 API 获取职业列表
        this.jobs = jobs;
        if (jobs.length > 0) {
          this.character.jobs = jobs[0].id; // 默认选中第一个职业
          this.updateSkills(); // 初次加载时更新技能
        }
      } catch (error) {
        console.error('获取职业失败', error);
        alert('无法加载职业数据');
      }
    },

    updateSkills() {
      const baseSkills = [
        { name: '普通攻击', damage: 10 },
        { name: '逃跑', damage: 0 },
      ];

      // 根据当前选中的 jobId 获取对应职业信息
      const job = this.jobs.find((job) => job.id === this.character.jobs);
      const jobSkills = job ? job.skills : []; // 如果没有对应职业，默认空技能列表

      // 更新技能选择框的内容
      this.selectedSkills = [
        { options: baseSkills, selected: baseSkills[0] },
        { options: baseSkills, selected: baseSkills[1] },
        ...jobSkills.map((skill) => ({
          options: [skill],
          selected: skill,
        })),
      ];

      // 更新角色的技能列表和职业名称
      this.character.skills = this.selectedSkills.map((skill) => skill.selected);
      this.character.job = job ? job.name : ''; // 更新显示用职业名称
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.character.avatar = reader.result;
      };
      if (file) reader.readAsDataURL(file);
    },

    async createCharacter() {
      // if (!this.character.avatar) {
      //   alert('请上传角色头像');
      //   return;
      // }

      console.log('character',this.character)
      try {
        const createdCharacter = await createCharacter(this.character); // 调用 API 创建角色
        this.characterCreated = true;
        console.log('createdCharacter',createdCharacter)
        this.character = createdCharacter.new_character;
      } catch (error) {
        console.error('创建角色失败', error);
        alert('角色创建失败');
      }
    },

    startBattle() {
      alert('战斗开始！');
    },
  },

  created() {
    this.fetchJobsData(); // 页面加载时获取职业列表
  },
};
</script>

<style scoped>
.character-creation {
  text-align: center;
  padding: 20px;
}

.character-info {
  text-align: center;
  padding: 20px;
}

.avatar-selection input {
  margin-top: 10px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border-radius: 50%;
}

.job-selection,
.skills,
.avatar-selection,
.name-selection,
.job-title-selection {
  margin-bottom: 20px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #2980b9;
}
</style>
