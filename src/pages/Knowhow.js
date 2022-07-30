import React from 'react';
import styled from 'styled-components';
import KnowhowItem from '../components/KnowhowItem';

const Knowhow = () => {
  return (
    <section>
      <h2 hidden>고수의 노하우</h2>
      <ArticleWrapper>
        {Array(8)
          .fill()
          .map((_, i) => (
            <KnowhowItem key={i} />
          ))}
      </ArticleWrapper>
    </section>
  );
};

export default Knowhow;

const ArticleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
