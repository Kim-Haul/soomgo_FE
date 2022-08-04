import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import apis, { api } from '../api/index';
import { categories, category } from '../data';
import PostItem from '../components/community/PostItem';
import Loading from '../components/common/Loading';
import { BiSearch } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { BsChatDotsFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

const Life = () => {
  const navigate = useNavigate();
  // 캐러셀 세팅
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const [selected, setSelected] = useState('ALL');
  const [isModalShown, setIsModalShown] = useState(false);
  const [typed, setTyped] = useState('');
  const onClickCategory = (name) => {
    window.scrollTo(0, 0);
    setSelected(name);
  };

  const onChangeKeyword = (e) => {
    setTyped(e.target.value);
  };

  const getPostData = async (pageParam = 0) => {
    try {
      // const res = api.get('http://localhost:5001/posts');
      const res = await api.get(
        `/posts?subject=${selected}&page=${pageParam}&size=5`,
      );
      const data = res.data.content;
      const last = res.data.last;
      return { data, last, nextPage: pageParam + 1 };
    } catch (e) {
      console.log(e);
    }
  };

  // 조회수 목록 글 불러오기
  const getCarousel = async () => {
    try {
      const res = await apis.getViewCount();
      console.log('찍어봅니다!', res);
      return res;
    } catch (e) {
      console.log('조회수 순으로 불러오기 에러', e);
    }
  };

  // 조회수 목록 글 불러오기 쿼리
  const { data: viewlist_query } = useQuery(['post_carousel'], getCarousel, {
    onSuccess: (data) => {
      // console.log('쿼리 불러오기', data.data.postList);
    },
  });

  // 무한 스크롤 데이터 패칭
  const {
    data: postList,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['postData'],
    ({ pageParam = 0 }) => getPostData(pageParam),
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

  useEffect(() => {
    refetch();
    queryClient.invalidateQueries('postData');
  }, [selected]);

  return (
    <>
      <LifeSection>
        <h2 hidden>숨고생활</h2>

        <LifeCategory>
          <ul>
            <h3 hidden>카테고리 목록</h3>
            {categories &&
              categories.map((category) => {
                return (
                  <CategoryItem
                    key={category.name}
                    tabIndex="0"
                    active={category.name === selected}
                    onClick={() => onClickCategory(category.name)}
                  >
                    <img src={category.img} alt="" />
                    {category.text}
                  </CategoryItem>
                );
              })}
          </ul>
        </LifeCategory>

        <LifeContentSection>
          <SearchInput>
            <BiSearch />
            <label htmlFor="search-community" hidden>
              커뮤니티 글 검색
            </label>
            <input
              id="search-community"
              type="text"
              value={typed}
              onChange={onChangeKeyword}
              placeholder="키워드로 검색할 수 있어요."
              onClick={() => setIsModalShown(true)}
            />
            {isModalShown && (
              <SearchModal>
                <Keyword>
                  <span>&quot;{typed}&quot;</span> 검색 결과
                </Keyword>
                <ModalContainer>
                  <SearchList>
                    {/* 검색 결과 map */}
                    <li>
                      <BiSearch />
                      검색결과
                    </li>
                    <li>
                      <BiSearch />
                      검색결과
                    </li>
                    <li>
                      <BiSearch />
                      검색결과
                    </li>
                    <li>
                      <BiSearch />
                      검색결과
                    </li>
                    <li>
                      <BiSearch />
                      검색결과
                    </li>
                    <li>
                      <BiSearch />
                      검색결과
                    </li>
                    <li>
                      <BiSearch />
                      검색결과
                    </li>
                  </SearchList>
                  <BtnClose>
                    <IoClose onClick={() => setIsModalShown(false)} />
                  </BtnClose>
                </ModalContainer>
              </SearchModal>
            )}
          </SearchInput>

          {selected === 'ALL' && (
            <>
              <h3>지금 가장 뜨거운 숨고픽🔥</h3>
              <Wrap>
                <StyledSlider {...settings}>
                  <div>
                    <SliderListF>
                      {/* FIXME: inline-style 수정 필요 */}
                      <div style={{ padding: '20px' }}>
                        <div style={{ fontSize: '14px' }}>공지사항</div>
                        <div style={{ fontWeight: '600', marginTop: '13px' }}>
                          올바른 커뮤니티 사용법 숨고생활 가이드✏️
                        </div>
                        <div
                          div
                          style={{ fontSize: '14px', marginTop: '30px' }}
                        >
                          Soomgo
                        </div>
                      </div>
                    </SliderListF>
                  </div>
                  {viewlist_query.data.postList.map((v, i) => {
                    return (
                      <div key={i}>
                        <SliderList
                          onClick={() => {
                            navigate(
                              `/community/soomgo-life/posts/${v.postId}`,
                            );
                          }}
                        >
                          <div style={{ padding: '20px' }}>
                            <div
                              style={{
                                fontSize: '12px',
                                color: '#888',
                                fontWeight: '500',
                              }}
                            >
                              {category[v.subject][0]}
                            </div>
                            <SliderTitle
                              style={{ fontWeight: '600', marginTop: '13px' }}
                            >
                              {v.title}
                            </SliderTitle>
                            <div
                              style={{
                                display: 'flex',
                                fontSize: '15px',
                                marginTop: '55px',
                                color: '#c5c5c5',
                                position: 'absolute',
                                bottom: '20px',
                              }}
                            >
                              <div
                                style={{
                                  marginRight: '3px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <AiFillLike />
                              </div>
                              <div> {v.likeCount}</div>

                              <div
                                style={{
                                  marginLeft: '15px',
                                  marginRight: '6px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <BsChatDotsFill
                                  style={{ transform: 'rotateY(180deg)' }}
                                />
                              </div>
                              <div> {v.commentCount}</div>
                            </div>
                          </div>
                        </SliderList>
                      </div>
                    );
                  })}
                </StyledSlider>
              </Wrap>
            </>
          )}

          <ul>
            {postList &&
              postList.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.data.map((post) => (
                    <PostItem key={post.postId} post={post} />
                  ))}
                </React.Fragment>
              ))}
          </ul>
        </LifeContentSection>
      </LifeSection>
      {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
    </>
  );
};

export default Life;

const LifeSection = styled.section`
  display: flex;
`;

const LifeCategory = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px;
  ul {
    position: sticky;
    top: 102px;
  }
`;

const CategoryItem = styled.li`
  margin: 2px 0;
  padding: 19px 20px;
  border-radius: 8px;
  color: #a9a9a9;
  font-size: 14px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      background: #eafaf9;
      color: #2d2d2d;
      font-weight: 700;
    `};
  img {
    width: 24px;
    margin-right: 8px;
  }
`;

const LifeContentSection = styled.section`
  flex: 1;
  max-width: 600px;
  margin-left: 85px;
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 40px;
  background: #f4f4f4;
  border-radius: 8px;
  svg {
    margin-right: 8px;
    fill: #c5c5c5;
    font-size: 20px;
  }
  input {
    flex: 1;
    height: 28px;
    border: none;
    background: none;
    outline: none;
    &::placeholder {
      color: #b5b5b5;
    }
  }
`;

const SearchModal = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  border: 1px solid #f2f2f2;
  border-radius: 6px;
  box-shadow: 0 0.125rem 0.625rem 0 rgb(0 0 0 / 10%);
  background: rgba(255, 255, 255, 0.95);
  z-index: 10;
`;

const ModalContainer = styled.div`
  overflow-y: auto;
  height: 250px;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    height: 79px;
    background-color: #eee;
    border-radius: 10px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
  &::-webkit-scrollbar-trac {
    background: none;
  }
`;

const Keyword = styled.p`
  margin-top: 20px;
  text-align: center;
  span {
    color: #00c7ae;
  }
`;

const SearchList = styled.ul`
  li {
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const BtnClose = styled.button`
  position: absolute;
  top: 20px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
  svg {
    margin: 0;
    fill: #fff;
  }
`;

const Wrap = styled.div`
  margin: 20px 0px;
`;

const StyledSlider = styled(Slider)`
  height: 180px;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  .slick-slide div {
    //슬라이더 컨텐츠
    cursor: pointer;
  }
`;

const SliderListF = styled.div`
  height: 180px;
  border-radius: 20px;
  background-color: #00c7ae;
  margin-right: 10px;
  div {
    color: white;
  }
`;

const SliderList = styled.div`
  height: 180px;
  border-radius: 20px;
  background-color: #f4f4f4;
  margin-right: 10px;
`;

const SliderTitle = styled.div`
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
