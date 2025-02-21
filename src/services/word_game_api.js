import axios from 'axios';
import { useUserStore } from '../stores/userStore';

// API 基础 URL
const API_URL = 'http://127.0.0.1:5001';

// 创建一个 Axios 实例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 创建角色
export const createCharacter = async (characterData) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }


    console.log('createCharacter',characterData)
    const response = await api.post('/create_character', {
      name: characterData.name,
      jobs: characterData.jobs,
      skills: characterData.skills,
      avatar: characterData.avatar,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Character created:', response.data);
    return response.data.character;
  } catch (error) {
    console.error('Error creating character:', error);
    throw error;
  }
};

// 更新角色
export const updateCharacter = async (characterId, characterData) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const jobId = characterData.job.id;
    const skills = characterData.skills.map(skill => ({
      id: skill.id,
      name: skill.name,
      damage: skill.damage,
    }));

    const response = await api.put(`/update_character/${characterId}`, {
      name: characterData.name,
      job: jobId,
      jobTitle: characterData.jobTitle,
      skills: skills,
      avatar: characterData.avatar,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Character updated:', response.data);
    return response.data.character;
  } catch (error) {
    console.error('Error updating character:', error);
    throw error;
  }
};

// 创建职业
export const createJob = async (jobData) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const skills = jobData.skills.map(skill => ({
      id: skill.id,
      name: skill.name,
      damage: skill.damage,
    }));

    const response = await api.post('/create_job', {
      name: jobData.name,
      title: jobData.title,
      skills: skills,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Job created:', response.data);
    return response.data.job;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

// 获取职业列表
export const fetchJobs = async () => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.get('/jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Fetched jobs:', response.data);
    return response.data.jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
// 获取角色列表
export const fetchCharacters = async () => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.get('/characters', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Fetched characters:', response.data);
    return response.data.characters; // 假设返回数据结构中有一个 `characters` 数组
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};



// 创建章节
export const createChapter = async (chapterData) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    // 确保用户已登录并获得 token
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    // 打印传入的章节数据
    console.log('createChapter', chapterData);

    // 假设传入的chapterData结构包含类似于 boards 的结构
    const response = await api.post('/create_chapter', {
      title: chapterData.title, // 章节的标题
      chapter_id: chapterData.chapter_id, 
      stories: chapterData.stories.map(story => ({
        id: story.id,  // 任务ID
        title: story.title,  // 任务标题
        content: story.content,  // 任务内容
        speakerId: story.speakerId,  // 任务讲述者ID
      })),
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // 打印创建成功后的响应数据
    console.log('Chapter created:', response.data);

    // 返回创建的章节 ID 或相关信息
    return response.data.chapter_id;  // 假设响应数据包含 chapter_id
  } catch (error) {
    // 错误处理
    console.error('Error creating chapter:', error);
    throw error;
  }
};


// 更新章节（使用 POST 请求）
export const updateChapter = async (currentBoard) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }
    console.log("updateChapter---------------",currentBoard)
    // 直接发送 currentBoard 作为请求的 payload
    const response = await api.post('/update_chapter', currentBoard, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Chapter updated:', response.data);
    return response.data.chapter;
  } catch (error) {
    console.error('Error updating chapter:', error);
    throw error;
  }
};

// 获取章节列表
export const fetchChapters = async () => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.get('/chapters', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // 将返回的数据转换为前端所需的格式
    const chapters = response.data.chapters.map((chapter) => ({
      id: chapter.id, // 唯一标识
      title: chapter.title, // 章节标题
      isEditingTitle: false, // 默认编辑状态
      stories: chapter.stories.map((story) => ({
        id: story.id, // 唯一标识
        title: story.title, // 任务标题
        content: story.content, // 任务内容
        speakerId: story.speakerId, // 说话人 ID
        isEditingTitle: false, // 默认编辑状态
        isEditingContent: false, // 默认编辑状态
        isEditingSpeakerId: false, // 默认编辑状态
      })),
    }));

    console.log('Formatted chapters:', chapters);
    return chapters;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};


// 获取特定章节的任务列表（如果需要）
export const fetchMissions = async (chapterId) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.get(`/missions/${chapterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Fetched missions:', response.data);
    return response.data.missions;
  } catch (error) {
    console.error('Error fetching missions:', error);
    throw error;
  }
};

