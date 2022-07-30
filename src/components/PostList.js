import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { AiFillLike } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa';

const PostList = () => {
  return (
      <PostItem>
        <Link to="posts/postid">
          <em>subject</em>
          <PostContent>
            <div>
              <strong>title</strong>
              <p>
                content - Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Exercitationem iste repellat alias repellendus tenetur
                nam, libero veritatis! Esse neque voluptate ipsum ipsam
                expedita, aperiam sit.
              </p>
              <ul className="list-tag">
                <li>tag1</li>
                <li>tag2</li>
                <li>tag3</li>
              </ul>
            </div>
            <img src="/images/icon-all.png" alt="" />
          </PostContent>
          <PostFooter>
            <ul className="list-count">
              <li>
                <AiFillLike />
                likeCount
              </li>
              <li>
                <FaCommentDots />
                commentCount
              </li>
            </ul>
            <small>createdAt</small>
          </PostFooter>
        </Link>
      </PostItem>
  );
};

export default PostList;

const PostItem = styled.li`
  padding: 16px 8px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 14px;
  em {
    display: inline-block;
    margin-bottom: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    background: #fafafa;
    color: #888;
    font-size: 12px;
    font-weight: 500;
  }
`;

const PostContent = styled.div`
  display: flex;
  strong {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
  }
  p {
    overflow: hidden;
    display: -webkit-box;
    margin-bottom: 8px;
    padding-right: 16px;
    color: #888;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    background: #eee;
  }
  ul.list-tag {
    display: flex;
    gap: 0 6px;
    li {
      color: #c5c5c5;
      &::before {
        content: '#';
      }
    }
  }
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  ul.list-count {
    display: flex;
    gap: 10px;
    svg {
      width: 20px;
      height: 17px;
      margin-right: 2px;
      padding-bottom: 3px;
      fill: #c5c5c5;
      &:last-child {
        transform: rotateY(180deg);
      }
    }
    li {
      color: #c5c5c5;
      font-size: 12px;
    }
  }
  small {
    font-size: 12px;
    letter-spacing: -0.2px;
    color: #c5c5c5;
  }
`;
