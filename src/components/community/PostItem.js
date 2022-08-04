import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { category } from '../../data';
import { AiFillLike } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa';

const PostItem = ({ post }) => {
  return (
    <Item>
      <Link to={`posts/${post.postId}`}>
        <em>{category[post.subject][0]}</em>
        <PostContent>
          <div>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <ul className="list-tag">
              {post.tagList.map((tag, idx) => (
                <li key={idx}>{tag}</li>
              ))}
            </ul>
          </div>
          {post.imgUrlList[0] && <img src={post.imgUrlList[0]} alt="" />}
        </PostContent>
        <PostFooter>
          <ul className="list-count">
            <li>
              <AiFillLike />
              {post.likeCount}
            </li>
            <li>
              <FaCommentDots />
              {post.commentCount}
            </li>
          </ul>
          <small>{new Date(post.createdAt).toLocaleDateString()}</small>
        </PostFooter>
      </Link>
    </Item>
  );
};

export default PostItem;

PostItem.propTypes = {
  post: PropTypes.object,
};

const Item = styled.li`
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
  justify-content: space-between;
  strong {
    overflow: hidden;
    display: -webkit-box;
    padding-right: 5px;
    margin-bottom: 4px;
    font-weight: 500;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
