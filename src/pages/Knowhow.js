import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import KnowhowItem from '../components/community/KnowhowItem';

const Knowhow = () => {
  const getKnowhowData = () => {
    try {
      const res = axios.get('http://localhost:5001/knowhow');
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const { data: knowhowList } = useQuery(['knowhowList'], getKnowhowData);
  // console.log(knowhowList.data);

  return (
    <section>
      <h2 hidden>고수의 노하우</h2>
      <ArticleWrapper>
        {knowhowList.data.map((post, i) => (
          <KnowhowItem key={i} post={post} />
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
