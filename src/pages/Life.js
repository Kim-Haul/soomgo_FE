import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { api } from '../api/index';
import { categories } from '../data';
import PostItem from '../components/community/PostItem';
import Loading from '../components/common/Loading';
import { BiSearch } from 'react-icons/bi';

const Life = () => {
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
  const onClickCategory = (name) => {
    window.scrollTo(0, 0);
    setSelected(name);
  };

  const getPostData = async (pageParam = 0) => {
    try {
      // const res = api.get('http://localhost:5001/posts');
      const res = await api.get(
        `/posts/cursor?lastid= &size=5&subject=${selected}`,
      );
      const data = res.data.content;
      const last = res.data.last;
      return { data, last, nextPage: pageParam + 1 };
    } catch (e) {
      console.log(e);
    }
  };

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
              // FIXME: key 추가, 데이터 없을 때 처리 다시
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
              placeholder="키워드와 #태그 모두 검색할 수 있어요."
            />
          </SearchInput>

          {/* TODO: 조회수 순 포스트 캐러셀 추가 */}
          {selected === 'ALL' && (
            <>
              <h3>지금 가장 뜨거운 숨고픽🔥</h3>
              <Wrap>
                <StyledSlider {...settings}>
                  <div>
                    <SliderListF>
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
                  <div>
                    <SliderList></SliderList>
                  </div>
                  <div>
                    <SliderList></SliderList>
                  </div>
                  <div>
                    <SliderList></SliderList>
                  </div>
                  <div>
                    <SliderList></SliderList>
                  </div>
                </StyledSlider>
              </Wrap>
            </>
          )}

          <ul>
            {postList &&
              postList.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.data.map((post) => (
                    <PostItem key={post.id} post={post} />
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

const Wrap = styled.div`
  margin: 20px 0px;
`;

const StyledSlider = styled(Slider)`
  height: 180px;
  width: 100%;
  position: relative;
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
