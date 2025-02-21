// src/utils/storage.js

const STORAGE_KEY_USER = 'user';
const STORAGE_KEY_TOKEN = 'token';

/**
 * 儲存用戶資料到 localStorage
 * @param {Object} user 用戶資料
 */
export function saveUser(user) {
  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user data to localStorage:', e);
  }
}

/**
 * 獲取用戶資料從 localStorage
 * @returns {Object|null} 用戶資料，若沒有則返回 null
 */
export function getUser() {
  try {
    const user = localStorage.getItem(STORAGE_KEY_USER);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Failed to retrieve user data from localStorage:', e);
    return null;
  }
}

/**
 * 儲存 token 到 localStorage
 * @param {String} token JWT token
 */
export function saveToken(token) {
  try {
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
  } catch (e) {
    console.error('Failed to save token to localStorage:', e);
  }
}

/**
 * 獲取 token 從 localStorage
 * @returns {String|null} JWT token，若沒有則返回 null
 */
export function getToken() {
  try {
    return localStorage.getItem(STORAGE_KEY_TOKEN);
  } catch (e) {
    console.error('Failed to retrieve token from localStorage:', e);
    return null;
  }
}

/**
 * 清除用戶資料和 token
 */
export function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  } catch (e) {
    console.error('Failed to clear storage:', e);
  }
}
