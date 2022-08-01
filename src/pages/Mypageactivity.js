import React from 'react';
import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';

const Mypageactivity = () => {
  return (
    <>
      <Container>
        <h1>숨고생활 작성글/댓글</h1>
        <CommunityNav>
          <ul>
            <li>
              <NavLink to="/mypage/community/posts">작성 글</NavLink>
            </li>
            <li>
              <NavLink to="/mypage/community/comments">작성 댓글</NavLink>
            </li>
          </ul>
        </CommunityNav>
      </Container>
      <Outlet />
    </>
  );
};

export default Mypageactivity;

const Container = styled.div`
  h1 {
    margin: 80px 0;
    font-size: 38px;
  }
  width: 100%;
`;

const CommunityNav = styled.nav`
  ul {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding: 15px 0 12px;
    border-bottom: 1px solid #f4f4f4;
    li a {
      padding: 10px 4px 12px;
      color: #a9a9a9;
      &.active {
        border-bottom: 2.5px solid #2d2d2d;
        color: #2d2d2d;
        font-weight: 700;
      }
    }
  }
`;
