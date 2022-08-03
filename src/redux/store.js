import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './modules/categorySlice';
import UserReducer from './modules/userSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: UserReducer,
  },
});

export default store;
