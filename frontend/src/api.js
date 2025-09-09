import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Spring Boot backend

export const registerUser = async (user) => {
  return await axios.post(`${BASE_URL}/register`, user);
};

export const loginUser = async (user) => {
  return await axios.post(`${BASE_URL}/login`, user);
};

export const createPost = async (formData) => {
  return await axios.post(`${BASE_URL}/posts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getPostsByUsername = async (username) => {
  return await axios.get(`${BASE_URL}/posts/${username}`);
};

export const createProject = async (formData) => {
  return await axios.post(`${BASE_URL}/projects`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProjectsByUsername = async (username) => {
  return await axios.get(`${BASE_URL}/projects/${username}`);
};

export const getProfile = async (username) => {
  return await axios.get(`${BASE_URL}/profile/${username}`);
};

export const updateProfile = async (formData) => {
  return await axios.post(`${BASE_URL}/profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createDefaultProfile = async (username) => {
  return await axios.get(`${BASE_URL}/profile/${username}/create-default`);
};

export const getAllUsers = async () => {
  return await axios.get(`${BASE_URL}/users`);
};

export const followUser = async (followerUsername, followingUsername) => {
  return await axios.post(`${BASE_URL}/follow`, {
    followerUsername,
    followingUsername
  });
};

export const unfollowUser = async (followerUsername, followingUsername) => {
  return await axios.delete(`${BASE_URL}/follow`, {
    data: {
      followerUsername,
      followingUsername
    }
  });
};

// Messages API
export const getFriends = async (userId) => {
  return await axios.get(`${BASE_URL}/messages/friends/${userId}`);
};

export const getMessagesBetweenUsers = async (user1Id, user2Id) => {
  return await axios.get(`${BASE_URL}/messages/between/${user1Id}/${user2Id}`);
};

export const sendMessage = async (messageData) => {
  return await axios.post(`${BASE_URL}/messages/send`, messageData);
};
