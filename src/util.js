import React from 'react';
import { api } from './api/index';
import { useQuery } from '@tanstack/react-query';

export const debounce = (callback, duration) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), duration);
  };
};

const getResultByKeyword = async (keyword, lastId) => {
  const res = await api.get(
    `/posts/search?lastId=${lastId ?? '%20'}&size=10&keyword=${keyword}`,
  );
  console.log(res.data.content);
  return res.data.content;
};

export const useResults = (keyword) => {
  return useQuery(['keyword', keyword], () => getResultByKeyword(keyword), {
    enabled: !!keyword,
    suspense: false,
    onSuccess: () => {
      console.log('검색중');
    },
  });
};

export const highlightText = (text, query) => {
  if (query !== '' && text.includes(query)) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index}>{part}</mark>
          ) : (
            part
          ),
        )}
      </>
    );
  }

  return text;
};
