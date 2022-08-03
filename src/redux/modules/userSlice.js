import { createSlice } from '@reduxjs/toolkit';

// 야이씨 이거 일단 쓰지마

const userSlice = createSlice({
  name: 'userinformation',
  initialState: {
    username: '초기이름',
    gosu: false,
  },

  reducers: {
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

export const { AddUser } = userSlice.actions;
export default userSlice.reducer;
