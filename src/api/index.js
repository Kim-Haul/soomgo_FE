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
  // auth
  signup: (data) => api.post('/signup', data),
  login: (data) => api.post('/login', data),
  getAuth: () => api.get('/auth'),
  // posts
  // getDetailData: () => api.get('posts'),
  // getCommentsData: () => api.get('comments'),
  // addComment: (data) => api.post('comments', data),
  // deleteComment: (id) => api.delete('comments', id)
};

export default apis;
