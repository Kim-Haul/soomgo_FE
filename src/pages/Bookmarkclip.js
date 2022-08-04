import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { bookmark } from '../data.js';
import apis from '../api/index';
import { useQuery } from '@tanstack/react-query';

const Accountinfo = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인 한 유저만 이용할 수 있습니다.');
      navigate('/login');
    }
  }, []);
  if (!isLoggedIn) return;

  // 북마크 목록 불러오기 api
  const getBookmarkedPosts = async () => {
    try {
      const res = await apis.getBookmarkedPosts();
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  // 북마크 목록 가져오기 쿼리
  const { data: bookmark_list } = useQuery(['book_list'], getBookmarkedPosts, {
    onSuccess: (data) => {
      console.log('쿼리 불러오기', data.data);
    },
  });

  return (
    <Wrap>
      <Container>
        <h1>북마크</h1>
        {bookmark_list.data.length >= 1 ? (
          <Cardlist>
            {bookmark_list.data.map((v, i) => {
              return (
                <Card key={i}>
                  <div style={{ fontWeight: '700', fontSize: '18px' }}>
                    {v.title}
                  </div>
                  <div style={{ fontSize: '14px', color: 'gray' }}>
                    {v.username}
                  </div>
                  <BookmarkContent style={{ marginTop: '10px' }}>
                    {v.content}
                  </BookmarkContent>

                  <Link to={`/community/pro-knowhow/posts/${v.postId}`}>
                    <button
                      onClick={() => {
                        navigate(`/community/pro-knowhow/posts/${v.postId}`);
                      }}
                    >
                      자세히보기
                    </button>
                  </Link>
                </Card>
              );
            })}
          </Cardlist>
        ) : (
          <Content>
            <img src="/images/none.png"></img>
            <div style={{ fontSize: '20px' }}>북마크한 글이 없습니다!</div>
            <div
              style={{
                color: '#b5b5b5',
                marginTop: '5px',
                textAlign: 'center',
              }}
            >
              고수들의 글을 둘러보고
              <br />
              마음에 드는 글을 북마크해보세요!
            </div>
          </Content>
        )}
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
  padding: 20px 15px 15px;
  width: 280px;
  height: 260px;
  margin-right: 30px;
  margin-bottom: 30px;

  a button {
    font-size: 16px;
    font-weight: 500;
  }

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
    bottom: 15px;
  }
`;

const Content = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookmarkContent = styled.div`
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
`;