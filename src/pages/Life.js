import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { categories } from '../data';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import PostItem from '../components/PostItem';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Life = () => {
  // 캐러셀 세팅
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const [selected, setSelected] = useState('ALL');
  const onClickCategory = (name) => {
    window.scrollTo(0, 0);
    setSelected(name);
    console.log(name); // delayed!
  };

  const getDetailData = () => {
    try {
      const res = axios.get('http://localhost:5001/posts');
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const { data: postList } = useQuery(['postList'], getDetailData);
  console.log(postList.data);

  return (
    <LifeSection>
      <h2 hidden>숨고생활</h2>

      <LifeCategory>
        <ul>
          <h3 hidden>카테고리 목록</h3>
          {categories &&
            categories.map((category) => {
              return (
                <CategoryItem
                  key={category.name}
                  tabIndex="0"
                  active={category.name === selected}
                  onClick={() => onClickCategory(category.name)}
                >
                  <img src={category.img} alt="" />
                  {category.text}
                </CategoryItem>
              );
            })}
        </ul>
      </LifeCategory>

      <LifeContentSection>
        <SearchInput>
          <BiSearch />
          <label htmlFor="search-community" hidden>
            커뮤니티 글 검색
          </label>
          <input
            id="search-community"
            type="text"
            placeholder="키워드와 #태그 모두 검색할 수 있어요."
          />
        </SearchInput>

        {selected === 'ALL' && <h3>지금 가장 뜨거운 숨고픽🔥</h3>}
        {/* TODO: 조회수 순 포스트 캐러셀 추가 */}
        {selected == 'ALL' ? (
          <Wrap>
            <StyledSlider {...settings}>
              <div>
                <SliderListF></SliderListF>
              </div>
              <div>
                <SliderList></SliderList>
              </div>
              <div>
                <SliderList></SliderList>
              </div>
              <div>
                <SliderList></SliderList>
              </div>
              <div>
                <SliderList></SliderList>
              </div>
            </StyledSlider>
          </Wrap>
        ) : null}

        <ul>
          {postList.data.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </LifeContentSection>
    </LifeSection>
  );
};

export default Life;

const LifeSection = styled.section`
  display: flex;
`;

const LifeCategory = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px;
  ul {
    position: sticky;
    top: 102px;
  }
`;

const CategoryItem = styled.li`
  margin: 2px 0;
  padding: 19px 20px;
  border-radius: 8px;
  color: #a9a9a9;
  font-size: 14px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      background: #eafaf9;
      color: #2d2d2d;
      font-weight: 700;
    `};
  img {
    width: 24px;
    margin-right: 8px;
  }
`;

const LifeContentSection = styled.section`
  flex: 1;
  max-width: 600px;
  margin-left: 85px;
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 40px;
  background: #f4f4f4;
  border-radius: 8px;
  svg {
    margin-right: 8px;
    fill: #c5c5c5;
    font-size: 20px;
  }
  input {
    flex: 1;
    height: 28px;
    border: none;
    background: none;
    outline: none;
    &::placeholder {
      color: #b5b5b5;
    }
  }
`;

const Wrap = styled.div`
  margin: 20px 0px;
`;

const StyledSlider = styled(Slider)`
  height: 180px;
  width: 100%;
  position: relative;
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  .slick-slide div {
    //슬라이더  컨텐츠
    cursor: pointer;
  }
`;

const SliderListF = styled.div`
  height: 180px;
  border-radius: 20px;
  background-color: #00c7ae;
  margin-right: 10px;
`;

const SliderList = styled.div`
  height: 180px;
  border-radius: 20px;
  background-color: #f4f4f4;
  margin-right: 10px;
`;
