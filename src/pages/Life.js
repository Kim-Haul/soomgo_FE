import React from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

const Life = () => {
  return (
    <LifeSection>
      <h2 hidden>
        숨고생활
      </h2>
      <LifeCategory>
        <ul>
          <li>전체</li>
          <li>궁금해요</li>
          <li>얼마예요</li>
          <li>고수찾아요</li>
          <li>함께해요</li>
          <li>일상</li>
        </ul>
      </LifeCategory>
      <LifeContentSection>
        <SearchInput>
          <BiSearch />
          <input
            type="text"
            placeholder="키워드와 #태그 모두 검색할 수 있어요."
          />
        </SearchInput>
        <h3>지금 가장 뜨거운 숨고픽🔥</h3>
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
  ul li {
    color: #a9a9a9;
  }
`;

const LifeContentSection = styled.section`
  flex: 1;
  max-width: 600px;
  margin-left: 85px;
  h3 {
    margin-top: 40px;
    font-size: 18px;
    font-weight: 700;
  }
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
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
