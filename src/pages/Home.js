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

  const getKnowhowData = () => {
    try {
      const res = axios.get('http://localhost:5001/knowhow');
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const { data: postList } = useQuery(['postList'], getPostData, {
    refetchOnWindowFocus: false,
  });
  const { data: knowhowList } = useQuery(['knowhowList'], getKnowhowData, {
    refetchOnWindowFocus: false,
  });

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

      <CurationSection>
        <header>
          <h2>숨고 커뮤니티에 물어보세요</h2>
          <Link to="/community/soomgo-life" className="view-all">
            전체보기
            <AiOutlineRight />
          </Link>
        </header>
        <CurationList>
          {postList.data.slice(0, 6).map((post) => (
            <li key={post.id}>
              <CurationContent to={`/community/soomgo-life/posts/${post.id}`}>
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
      </CurationSection>
      <CurationSection>
        <header>
          <h2>고수의 노하우를 알아보세요</h2>
          <Link to="/community/pro-knowhow" className="view-all">
            전체보기
            <AiOutlineRight />
          </Link>
        </header>
        <KnowhowList>
          {knowhowList.data.slice(0, 4).map((knowhow) => (
            <li key={knowhow.id}>
              <Link to="">
                <div>
                  <img src={knowhow.imgurlList[0]} alt="" />
                </div>
                <strong>{knowhow.title}</strong>
                <em>{knowhow.writer}</em>
              </Link>
            </li>
          ))}
        </KnowhowList>
      </CurationSection>
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

const CurationSection = styled.section`
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  h2 {
    font-size: 24px;
    font-weight: 700;
  }
  a.view-all {
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
  gap: 0 40px;
  height: 309px;
  margin-bottom: 80px;
  li {
    display: flex;
    width: calc(50% - 40px);
  }
`;

const CurationContent = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 14px 2px 16px;
  border-bottom: 1px solid #f4f4f4;
  div {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    font-size: 14px;
    white-space: nowrap;
    em {
      font-weight: 500;
      font-style: normal;
    }
    strong {
      overflow: hidden;
      margin: 5px 0 4px;
      font-weight: 500;
      text-overflow: ellipsis;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      color: #737373;
    }
  }
  img {
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 8px;
  }
`;

const KnowhowList = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 30px 0 50px;
  li a {
    div {
      overflow: hidden;
      border-radius: 8px;
      margin-bottom: 5px;
    }
    &:hover {
      img {
        transform: scale(110%);
      }
    }
  }
  img {
    width: 100%;
    object-fit: cover;
    transition: 0.4s all cubic-bezier(0.4, 0, 0.2, 1);
  }
  strong {
    display: flex;
    align-items: center;
    height: 2.3em;
    line-height: 1em;
  }
  em {
    color: #737373;
    font-size: 14px;
  }
`;
