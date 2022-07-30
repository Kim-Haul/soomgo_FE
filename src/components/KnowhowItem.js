import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const KnowhowItem = () => {
  return (
    <KnowhowArticle>
      <Link to="posts/postid">
        <img src="https://pbs.twimg.com/media/EtHubB8UUAEkgbN.jpg" alt="" />
        <strong>
          노하우 제목 Lorem ipsum dolor sit amet consectetur. Lorem, ipsum dolor
          sit amet consectetur adipisicing.
        </strong>
        <p>작성자</p>
      </Link>
    </KnowhowArticle>
  );
};

export default KnowhowItem;

const KnowhowArticle = styled.article`
  display: flex;
  flex-direction: column;
  flex: 0 1 33.3%;
  padding: 16px 8px;
  img {
    width: 100%;
    margin-bottom: 12px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    background: #eee;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }
  strong {
    overflow: hidden;
    display: -webkit-box;
    /* width: 100%; */
    margin-bottom: 4px;
    font-weight: 500;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  p {
    font-size: 14px;
    color: #737373;
  }
`;
