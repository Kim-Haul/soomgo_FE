import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import apis from '../api';
import MainSlider from '../components/MainSlider';
import { mainCategories } from '../data';
import { AiOutlineRight } from 'react-icons/ai';

const Home = () => {
  const getPostData = () => {
    try {
      const res = axios.get('http://localhost:5001/posts');
      // FIXME: 6개만 받아오기
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const { data: postList } = useQuery(['postList'], getPostData, {
    refetchOnWindowFocus: false,
  });

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

      <MainCommunity>
        <header>
          <h2>숨고 커뮤니티에 물어보세요</h2>
          <Link to="/community/soomgo-life">
            전체보기
            <AiOutlineRight />
          </Link>
        </header>
        <CurationList>
          {postList.data.slice(0, 6).map((post) => (
            <li key={post.id}>
              <CurationContent>
                <div>
                  <em>{post.subject}</em>
                  <strong>{post.title}</strong>
                  <p>{post.content}</p>
                </div>
                <img src="/images/icon-all.png" alt="" />
              </CurationContent>
            </li>
          ))}
        </CurationList>
      </MainCommunity>

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

const MainCommunity = styled.section`
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  h2 {
    font-size: 24px;
    font-weight: 700;
  }
  a {
    display: flex;
    align-items: center;
    color: #00c7ae;
    svg {
      padding-top: 1px;
      fill: #00c7ae;
    }
  }
`;

const CurationList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0 35px;
  height: 360px;
  margin-bottom: 80px;
  li {
    display: flex;
    width: 40%;
    max-width: 480px;
  }
`;

const CurationContent = styled.div`
  display: flex;
  width: 480px;
  max-width: 480px;
  justify-content: space-between;
  padding: 14px 2px 16px;
  border-bottom: 1px solid #f4f4f4;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 416px;
    font-size: 14px;
    em {
      font-weight: 500;
      font-style: normal;
    }
    strong {
      margin: 5px 0 4px;
      font-weight: 500;
    }
    p {
      overflow: hidden;
      color: #737373;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  img {
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 8px;
  }
`;
