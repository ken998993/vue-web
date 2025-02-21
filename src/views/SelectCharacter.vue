<template>
  <div id="select-character">
    <h1>选择角色</h1>

    <div v-if="characters.length === 0" class="no-characters">
      <p>你还没有创建任何角色，请先创建角色。</p>
      <button @click="goToCreateCharacter">创建角色</button>
    </div>

    <div v-else>
      <div class="character-list">
        <div 
          v-for="character in characters" 
          :key="character.id" 
          :class="['character-card', { selected: selectedCharacter?.id === character.id }]"
          @click="selectCharacter(character)"
        >
          <img :src="character.avatar" alt="角色头像" class="avatar-preview" />
          <div class="character-info">
            <h3>{{ character.name }}</h3>
            <p>职业：{{ character.job?.name || '未知' }}</p>
            <p>职业头衔：{{ character.job?.title || '无' }}</p>
            <p>技能：</p>
            <ul>
              <li v-for="(skill, idx) in character.skills" :key="idx">
                {{ skill.name }} - {{ skill.damage }} 点伤害
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="selectedCharacter" class="selected-info">
        <h2>当前选中角色：{{ selectedCharacter.name }}</h2>
        <button @click="confirmSelection">确认选择</button>
      </div>

      <button class="create-character" @click="goToCreateCharacter">创建新角色</button>
    </div>
  </div>
</template>

<script>
import { fetchCharacters } from '../services/word_game_api';

export default {
  name: 'SelectCharacter',
  data() {
    return {
      characters: [],
      selectedCharacter: null,
    };
  },
  methods: {
    async fetchCharactersData() {
      try {
        const response = await fetchCharacters();
        this.characters = response.map(character => ({
          ...character,
          job: character.jobs || {},
          skills: character.skills || []
        }));
      } catch (error) {
        console.error('获取角色失败', error);
        alert('无法加载角色数据');
      }
    },
    selectCharacter(character) {
      this.selectedCharacter = character;
    },
    confirmSelection() {
      if (this.selectedCharacter) {
        localStorage.setItem('selectedCharacter', JSON.stringify(this.selectedCharacter));
        this.$router.push({ name: 'level-selection' });
      } else {
        alert('请先选择一个角色！');
      }
    },
    goToCreateCharacter() {
      this.$router.push({ name: 'create-character' });
    }
  },
  created() {
    this.fetchCharactersData();
  }
};
</script>

<style scoped>
#select-character {
  text-align: center;
  padding: 20px;
}

.character-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.character-card {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 10px;
  width: 180px;
  cursor: pointer;
  text-align: center;
  transition: 0.3s;
}

.character-card:hover {
  transform: scale(1.05);
}

.character-card.selected {
  border: 2px solid #3498db;
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.create-character {
  margin-top: 15px;
}
</style>
