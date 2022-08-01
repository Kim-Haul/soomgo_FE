import React from 'react';
import styled from 'styled-components';

const MyComment = () => {
  return (
    <Wrap>
      <Content>
        <img src="/images/none.png"></img>
        <div style={{ fontSize: '20px' }}>작성 댓글이 없습니다</div>
        <div
          style={{ color: '#b5b5b5', marginTop: '5px', textAlign: 'center' }}
        >
          준비중인 기능입니다!
          <br />
          다른 메뉴를 이용해주세요!
        </div>
      </Content>
    </Wrap>
  );
};

export default MyComment;

const Wrap = styled.div``;

const Content = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
