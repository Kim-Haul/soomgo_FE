import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { useSelector } from 'react-redux';

import PostList from '../components/PostList';

const Life = () => {
  const [selected, setSelected] = useState('ALL');
  const categories = useSelector((state) => state.category);
  const onClickCategory = (name) => {
    setSelected(name);
    console.log(name); // delayed!
  };

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

        <ul>
          <PostList />
          <PostList />
          <PostList />
          <PostList />
          <PostList />
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
