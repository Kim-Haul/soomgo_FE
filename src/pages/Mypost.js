import React from 'react';
import styled from 'styled-components';
import { mypost } from '../data';

const Myposts = () => {
  return (
    <Wrap>
      {/* <Content>
        <img src="/images/none.png"></img>
        <div style={{ fontSize: '20px' }}>작성 글이 없습니다</div>
        <div
          style={{ color: '#b5b5b5', marginTop: '5px', textAlign: 'center' }}
        >
          평범한 일상부터 생활서비스에 대한
          <br /> 정보와 질문을 올려보세요!
        </div>
      </Content> */}
      {mypost.map((v, i) => {
        return (
          <List key={i}>
            <Tag>
              <span>{v.tag}</span>
            </Tag>
            <div
              style={{
                fontWeight: '500',
                marginTop: '5px',
                marginBottom: '5px',
              }}
            >
              {v.title}
            </div>
            <div style={{ color: 'gray' }}>{v.content.slice(0, 250)}</div>
            <div
              style={{
                color: 'rgba(197,197,197)',
                marginTop: '18px',
                marginBottom: '18px',
              }}
            >
              {v.createAt}
            </div>
          </List>
        );
      })}
    </Wrap>
  );
};

export default Myposts;

const Wrap = styled.div``;

const List = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f4f4f4;
  margin-bottom: 20px;
`;

const Tag = styled.div`
  span {
    background-color: #fafafa;
    color: gray;
    font-size: 14px;
    padding: 3px;
    margin-left: 5px;
    margin-bottom: 2px;
  }
`;
