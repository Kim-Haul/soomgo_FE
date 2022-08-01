import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.125.250.104/api',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('TOKEN');
  config.headers.common['Authorization'] = `${accessToken}`;
  return config;
});

const apis = {
  // auth & mypage
  signup: (data) => api.post('/signup', data),
  login: (data) => api.post('/login', data),
  toggleRole: () => api.put('/role'), // 고수 유저 간 전환
  getAuth: () => api.get('/auth'),
  editAuth: (data) => api.put('/auth', data),
  getMypost: () => api.get('/myposts'),

  // post
  getDetailPost: (postId) => api.get(`posts/${postId}`),
  addPost: (data) => api.post('posts', data),
  editPost: (postId, data) => api.put(`posts/${postId}`, data),
  deletePost: (postId) => api.delete(`posts/${postId}`),

  // comments
  getCommentsData: (postId) => api.get(`comments/${postId}`),
  addComment: (postId, data) => api.post(`comments/${postId}`, data),
  editComment: (postId, data) => api.put(`comments/${postId}`, data),
  deleteComment: (commentId) => api.delete(`comments/${commentId}`),

  // like
  addLike: (postId) => api.post(`likes/${postId}`),
  removeLike: (postId) => api.delete(`likes/${postId}`),

  // bookmark
  getBookmarkedPosts: () => api.get('mybookmark'),
  addBookmark: (postId) => api.post(`bookmark/${postId}`),
  removeBookmark: (postId) => api.delete(`bookmark/${postId}`),
};

export default apis;
