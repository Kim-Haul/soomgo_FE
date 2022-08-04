import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './modules/userSlice';

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
