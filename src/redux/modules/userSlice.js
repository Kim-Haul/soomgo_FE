import { createSlice } from '@reduxjs/toolkit';

// 야이씨 이거 일단 쓰지마

const userSlice = createSlice({
  name: 'userinformation',
  initialState: {
    isLoggedIn: false,
    username: '초기이름',
    gosu: false,
  },

  reducers: {
    toggleLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    toggleGosu: (state, action) => {
      state.gosu = action.payload;
    },
    AddUser: (state, action) => {
      console.log('유저 정보를 리듀서에 저장 !');
      console.log(action.payload);
      const User = {
        username: action.payload.username,
        gosu: action.payload.gosu,
      };
      state.username = User.username;
      state.gosu = User.gosu;
    },
  },
});

export const { toggleLoggedIn, toggleGosu, AddUser } = userSlice.actions;
export default userSlice.reducer;
