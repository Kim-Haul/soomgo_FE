import React from 'react';
import styled from 'styled-components';

import apis from '../api';
import MainSlider from '../components/MainSlider';
import { mainCategories } from '../data';

const Home = () => {
  const getAuthInfo = async () => {
    try {
      const res = await apis.getAuth();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MainSlider />
      <MainCategoryList>
        {mainCategories.map((cat) => (
          <li key={cat.id}>
            <img src={cat.img} alt="" />
            {cat.text}
          </li>
        ))}
      </MainCategoryList>
      <div>
        <button onClick={getAuthInfo}>auth 불러오기</button>
      </div>
    </>
  );
};

export default Home;

const MainCategoryList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 32px 0 64px;
  padding: 16px;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 96px;
    border-radius: 20px;
    font-weight: 500;
    transition: all 0.2s ease;
    img {
      margin-bottom: 4px;
    }
    &:hover {
      background: #fafafa;
      transform: translateY(-4px);
    }
  }
`;
