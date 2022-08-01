import React, { useState } from 'react';
import styled from 'styled-components';
import { categories } from '../data';

const Post = () => {
  const [isGosu, setIsGosu] = useState(false);
  return (
    <div>
      <form>
        <Row>
          <select>
            <option disabled>주제 선택</option>
            {categories.slice(1).map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.text}
              </option>
            ))}
            {isGosu && <option>고수의노하우</option>}
          </select>
          <button>등록</button>
        </Row>
      </form>
    </div>
  );
};

export default Post;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  button {
    font-weight: 500;
    background: none;
    color: #00c7ae;
    &:disabled {
      color: #c5c5c5;
      cursor: default;
      &:hover {
        filter: none;
      }
    }
  }
`;
