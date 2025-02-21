<template>
  <div class="trello">
    <div class="board" v-for="(list, listIndex) in boards" :key="list.id">
      <div class="board-header">
        <div v-if="list.isEditingTitle">
          <input
            v-model="list.title"
            @blur="saveBoardTitle(list)"
            @keyup.enter="saveBoardTitle(list)"
            class="board-title-input"
            autofocus
          />
        </div>
        <div v-else class="board-title">
          <h3 @click="editBoardTitle(list)">{{ list.title }}</h3>
          <button class="delete-board-btn" @click="deleteBoard(listIndex)">X</button>
        </div>
      </div>
      <div class="story-list">
        <div class="story" v-for="(story, storyIndex) in list.stories" :key="story.id">
          <div v-if="story.isEditingTitle">
            <input
              v-model="story.title"
              @blur="saveStoryTitle(story)"
              @keyup.enter="saveStoryTitle(story)"
              class="story-input"
              autofocus
            />
          </div>
          <div v-else class="story-title">
            <span @click="editStoryTitle(story)">{{ story.title }}</span>
            <button class="delete-story-btn" @click="deleteStory(listIndex, storyIndex)">X</button>
          </div>
          <div v-if="story.isEditingContent">
            <textarea
              v-model="story.content"
              @blur="saveStoryContent(story)"
              @keyup.enter="saveStoryContent(story)"
              class="story-content-input"
              autofocus
            />
          </div>
          <div v-else>
            <p @click="editStoryContent(story)">{{ story.content || "Click to add content" }}</p>
          </div>
          <div v-if="story.isEditingSpeakerId">
            <input
              v-model="story.speakerId"
              @blur="saveSpeakerId(story)"
              @keyup.enter="saveSpeakerId(story)"
              class="speaker-id-input"
            />
          </div>
          <div v-else class="speaker-id" @click="editSpeakerId(story)">
            Speaker ID: {{ story.speakerId || "Click to add" }}
          </div>
        </div>
      </div>
      <button @click="addStory(listIndex)">+ Add Story</button>
      <button class="save-chapter" @click="saveOrUpdateChapter(listIndex)">
        {{ list.id ? "Update Chapter" : "Save Chapter" }}
      </button>
    </div>
    <button class="add-board" @click="addBoard">+ Add Board</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchChapters, createChapter, updateChapter } from "../services/word_game_api";

export default {
  setup() {
    const boards = ref([]);

    // 加載章節數據
    const loadChapters = async () => {
      try {
        const chapters = await fetchChapters();
        boards.value = chapters.map((chapter) => ({
          id: chapter.id,
          title: chapter.title || "Untitled Chapter",
          isEditingTitle: false,
          stories: chapter.stories.map((story) => ({
            id: story.id,
            title: story.title || "Untitled Story",
            content: story.content || "",
            speakerId: story.speaker_id || null,
            isEditingTitle: false,
            isEditingContent: false,
            isEditingSpeakerId: false,
          })),
        }));
      } catch (error) {
        console.error("Failed to load chapters:", error);
        alert("Failed to load chapters. Please try again later.");
      }
    };

    onMounted(() => {
      loadChapters();
    });

    // 新增或更新章節
    const saveOrUpdateChapter = async (listIndex) => {
      const board = boards.value[listIndex];

      // 空值檢查
      if (!board.title.trim()) {
        alert("Chapter title cannot be empty.");
        return;
      }

      const chapterData = {
        chapter_id: board.id || null,
        title: board.title,
        stories: board.stories.map((story) => ({
          title: story.title.trim(),
          content: story.content.trim(),
          speakerId: story.speakerId,
        })),
      };

      try {
        if (board.id) {
          // 更新章節
          const response = await updateChapter(chapterData);
          console.log(`Chapter "${board.title}" updated successfully.`);
        } else {
          // 新增章節
          const response = await createChapter(chapterData);
          board.id = response.chapter_id; // 保存返回的章節 ID
          console.log(`Chapter "${board.title}" created successfully.`);
        }
      } catch (error) {
        console.error(`Failed to save chapter "${board.title}":`, error);
        alert("Failed to save the chapter. Please try again.");
      }
    };

    const addBoard = () => {
      boards.value.push({
        id: null,
        title: "New Board",
        isEditingTitle: false,
        stories: [],
      });
    };

    const deleteBoard = (listIndex) => {
      if (confirm("Are you sure you want to delete this board?")) {
        boards.value.splice(listIndex, 1);
      }
    };

    const editBoardTitle = (board) => {
      board.isEditingTitle = true;
    };

    const saveBoardTitle = (board) => {
      board.isEditingTitle = false;
      if (!board.title.trim()) board.title = "Untitled Chapter";
    };

    const addStory = (listIndex) => {
      boards.value[listIndex].stories.push({
        id: null,
        title: "New Story",
        content: "",
        speakerId: null,
        isEditingTitle: false,
        isEditingContent: false,
        isEditingSpeakerId: false,
      });
    };

    const deleteStory = (listIndex, storyIndex) => {
      if (confirm("Are you sure you want to delete this story?")) {
        boards.value[listIndex].stories.splice(storyIndex, 1);
      }
    };

    const editStoryTitle = (story) => {
      story.isEditingTitle = true;
    };

    const saveStoryTitle = (story) => {
      story.isEditingTitle = false;
      if (!story.title.trim()) story.title = "Untitled Story";
    };

    const editStoryContent = (story) => {
      story.isEditingContent = true;
    };

    const saveStoryContent = (story) => {
      story.isEditingContent = false;
    };

    const editSpeakerId = (story) => {
      story.isEditingSpeakerId = true;
    };

    const saveSpeakerId = (story) => {
      story.isEditingSpeakerId = false;
    };

    return {
      boards,
      addBoard,
      deleteBoard,
      editBoardTitle,
      saveBoardTitle,
      addStory,
      deleteStory,
      editStoryTitle,
      saveStoryTitle,
      editStoryContent,
      saveStoryContent,
      editSpeakerId,
      saveSpeakerId,
      saveOrUpdateChapter,
    };
  },
};
</script>

<style scoped>
.trello {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f4f5f7;
  overflow-x: auto;
}

.board {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  width: 300px;
  position: relative;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board-title-input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
}

.board-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-board-btn {
  background: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  margin-left: 8px;
}

.story-list {
  min-height: 100px;
  border: 1px dashed #ddd;
  padding: 8px;
  margin-bottom: 16px;
}

.story {
  background: #e0e4e7;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
}

.delete-story-btn {
  background: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  margin-left: 8px;
}

.speaker-id {
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  cursor: pointer;
}

.speaker-id-input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.save-chapter {
  background: green;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
}
</style>
