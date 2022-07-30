import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: [
    {
      name: 'ALL',
      text: '전체',
      img: '/images/icon-all.png',
    },
    {
      name: 'QNA',
      text: '궁금해요',
      img: '/images/icon-qna.png',
    },
    {
      name: 'HOWMUCH',
      text: '얼마예요',
      img: '/images/icon-howmuch.png',
    },
    {
      name: 'FINDGOSU',
      text: '고수찾아요',
      img: '/images/icon-findgosu.png',
    },
    {
      name: 'TOGETHER',
      text: '함께해요',
      img: '/images/icon-together.png',
    },
    {
      name: 'FREE',
      text: '일상',
      img: '/images/icon-free.png',
    }
  ],
  reducers: {},
});

export default categorySlice.reducer;
