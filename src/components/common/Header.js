import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import apis from '../../api/index';

const Header = () => {
  // useEffect(() => {
  //   const getAuthInfo = async () => {
  //     try {
  //       const res = await apis.getAuth();
  //       console.log(res);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getAuthInfo();
  // }, []);

  return (
    <HeaderComponent>
      <Navbar>
        <NavLeft>
          <Link to="/">
            <img
              src="/images/icon-navi-logo.svg"
              alt="숨고 메인페이지로 가기"
            />
          </Link>
        </NavLeft>
        <NavRight>
          <ul>
            <li>
              <Link to="/community/soomgo-life">커뮤니티</Link>
            </li>
            <li>
              <Link to="/mypage/bookmark">북마크</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <button
              className="btn-gosu"
              onClick={() => alert('로그인 후 고수유저로 전환해주세요 :)')}
            >
              고수가입
            </button>
          </ul>
        </NavRight>
      </Navbar>
    </HeaderComponent>
  );
};

export default Header;

const HeaderComponent = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
  z-index: 100;
`;

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  max-width: 970px;
  height: 72px;
  margin: 0 auto;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  ul {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  button.btn-gosu {
    min-width: 80px;
    height: 36px;
    padding: 6.5px 0;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;
