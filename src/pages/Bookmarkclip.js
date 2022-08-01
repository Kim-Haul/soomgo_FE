import React from 'react';
import styled from 'styled-components';
import { bookmark } from '../data.js';

const Accountinfo = () => {
  return (
    <Wrap>
      <Container>
        <h1>북마크</h1>
        <Cardlist>
          {bookmark.map((v, i) => {
            return (
              <Card key={i}>
                <div style={{ fontWeight: '700', fontSize: '18px' }}>
                  {v.title}
                </div>
                <div style={{ fontSize: '14px', color: 'gray' }}>
                  {v.username}
                </div>
                <div style={{ marginTop: '10px' }}>
                  {v.content.slice(0, 60)}
                  <span style={{ color: 'gray' }}> ...</span>
                </div>
                <button>자세히보기</button>
              </Card>
            );
          })}
        </Cardlist>
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
  width: 100%;
`;

const Cardlist = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  position: relative;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  padding: 15px;
  width: 280px;
  height: 260px;
  margin-right: 30px;
  margin-bottom: 30px;

  @media (max-width: 1000px) {
    width: 400px;
    height: 260px;
  }

  @media (max-width: 900px) {
    width: 800px;
    height: 260px;
  }

  button {
    width: 90%;
    height: 50px;
    font-size: 19px;
    position: absolute;
    border-radius: 5px;
    bottom: 10px;
  }
`;
