import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { api } from '../api/index';
import KnowhowItem from '../components/community/KnowhowItem';
import Loading from '../components/common/Loading';

const Knowhow = () => {
  const { ref, inView } = useInView();

  const getKnowhowData = async (pageParam = 0) => {
    try {
      const res = await api.get(
        `/posts?subject=KNOWHOW&page=${pageParam}&size=9`,
      );
      const data = res.data.content;
      const last = res.data.last;
      return { data, last, nextPage: pageParam + 1 };
    } catch (e) {
      console.log(e);
    }
  };

  const {
    data: knowhowList,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['knowhowData'],
    ({ pageParam = 0 }) => getKnowhowData(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
    },
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <section>
        <h2 hidden>고수의 노하우</h2>
        <ArticleWrapper>
          {knowhowList &&
            knowhowList.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((post) => (
                  <KnowhowItem key={post.postId} post={post} />
                ))}
              </React.Fragment>
            ))}
        </ArticleWrapper>
      </section>
      {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
    </>
  );
};

export default Knowhow;

const ArticleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
