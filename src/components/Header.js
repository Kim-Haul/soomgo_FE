import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
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
              <Link to="">커뮤니티</Link>
            </li>
            <li>
              <Link to="">마켓</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <button>고수가입</button>
          </ul>
        </NavRight>
      </Navbar>
    </HeaderComponent>
  );
};

export default Header;

const HeaderComponent = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 0 10px;
  z-index: 100;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 970px;
  height: 72px;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

const NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  ul {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;
