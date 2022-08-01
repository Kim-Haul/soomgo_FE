import React from 'react';
import styled from 'styled-components';
import { AiOutlineRight } from 'react-icons/ai';

const Accountinfo = () => {
  return (
    <Wrap>
      <Container>
        <h1>계정 설정</h1>
        <ProfileImg></ProfileImg>
        <List>
          <li>
            <div style={{ margin: '14px 0', position: 'relative' }}>
              <div style={{ color: '#b5b5b5' }}>이름</div>
              <div style={{ marginTop: '10px' }}>전인호</div>
              <AiOutlineRight
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '10px',
                  color: '#b5b5b5',
                }}
              />
            </div>
          </li>
          <li>
            <div style={{ margin: '14px 0', position: 'relative' }}>
              <div style={{ color: '#b5b5b5' }}>이메일</div>
              <div style={{ marginTop: '10px' }}>abc@naver.com</div>
              <AiOutlineRight
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '10px',
                  color: '#b5b5b5',
                }}
              />
            </div>
          </li>
          <li>
            <div style={{ margin: '14px 0', position: 'relative' }}>
              <div style={{ color: '#b5b5b5' }}>비밀번호</div>
              <div style={{ marginTop: '10px' }}>******</div>
              <AiOutlineRight
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '10px',
                  color: '#b5b5b5',
                }}
              />
            </div>
          </li>
          <li>
            <div style={{ margin: '14px 0', position: 'relative' }}>
              <div style={{ color: '#b5b5b5' }}>휴대전화번호</div>
              <div style={{ marginTop: '10px' }}>010-8790-6480</div>
              <AiOutlineRight
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '10px',
                  color: '#b5b5b5',
                }}
              />
            </div>
          </li>
        </List>
      </Container>
    </Wrap>
  );
};

export default Accountinfo;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  h1 {
    margin: 80px 0;
    font-size: 38px;
  }
  width: 70%;
`;

const ProfileImg = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 100px;
  margin: 80px auto;
`;

const List = styled.ul`
  li {
    position: relative;
    border-bottom: 1px solid #f4f4f4;

    div {
      color: #323232;
      font-size: 18px;
    }
  }
`;
