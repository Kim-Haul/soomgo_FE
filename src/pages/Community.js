import React from 'react';
import styled from 'styled-components';
import { RiPencilFill } from 'react-icons/ri';
import { Outlet, NavLink } from 'react-router-dom';

const Community = () => {
  return (
    <>
      <CommunityHeader>
        <h1>커뮤니티</h1>
        <BtnPost>
          {/* TODO: 글쓰기 페이지 링크 추가 */}
          글쓰기
          <RiPencilFill />
        </BtnPost>
      </CommunityHeader>
      <CommunityNav>
        <ul>
          <li>
            <NavLink to="/community/soomgo-life">숨고생활</NavLink>
          </li>
          <li>
            <NavLink to="/community/pro-knowhow">고수의 노하우</NavLink>
          </li>
        </ul>
      </CommunityNav>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default Community;

const CommunityHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 55px 0 25px;
`;

const BtnPost = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 44px;
  padding: 10px 0;
  border-radius: 6px;
  font-weight: 500;
  svg {
    margin-left: 4px;
    fill: #fff;
  }
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
