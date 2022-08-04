import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useResults, highlightText } from '../../util';
import { BiSearch } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

const SearchModal = ({ inputValue, setShown }) => {
  const { data: resultData } = useResults(inputValue);
  return (
    <Container>
      <Keyword>
        <span>&quot;{inputValue}&quot;</span> 검색 결과
      </Keyword>
      <ModalContainer>
        <SearchList>
          {resultData &&
            resultData.map((result) => (
              <li key={result.postId}>
                <Link to={`/community/soomgo-life/posts/${result.postId}`}>
                  <BiSearch />
                  {highlightText(result.title, inputValue)}
                </Link>
              </li>
            ))}
        </SearchList>
        <BtnClose onClick={() => setShown(false)}>
          <IoClose />
        </BtnClose>
      </ModalContainer>
    </Container>
  );
};

export default SearchModal;

const Container = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  border: 1px solid #f2f2f2;
  border-radius: 6px;
  box-shadow: 0 0.125rem 0.625rem 0 rgb(0 0 0 / 10%);
  background: rgba(255, 255, 255, 0.95);
  z-index: 10;
`;

const ModalContainer = styled.div`
  overflow-y: auto;
  max-height: 250px;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    height: 79px;
    background-color: #eee;
    border-radius: 10px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
  &::-webkit-scrollbar-trac {
    background: none;
  }
`;

const Keyword = styled.p`
  margin-top: 20px;
  text-align: center;
  span {
    color: #00c7ae;
  }
`;

const SearchList = styled.ul`
  li {
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
    a {
      display: block;
      padding: 10px;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const BtnClose = styled.button`
  position: absolute;
  top: 20px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
  svg {
    margin: 0;
    padding: 0;
    fill: #fff;
  }
`;
