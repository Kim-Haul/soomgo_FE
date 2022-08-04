import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { BsChatRightText, BsBookmarkStar } from 'react-icons/bs';
import { RiCoupon2Fill, RiUserStarLine, RiUser3Line } from 'react-icons/ri';
import { AiOutlineRight } from 'react-icons/ai';
import apis from '../api/index';

const Mypage = () => {
  const navigate = useNavigate();
  const [isGosu, setIsGosu] = useState(false);
  const queryClient = useQueryClient();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인 한 유저만 이용할 수 있습니다.');
      navigate('/login');
    }
  }, []);
  if (!isLoggedIn) return;

  // 유저정보 불러오기 api
  const getMyProfile = async () => {
    try {
      const res = await apis.getAuth();
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  // 유저정보 불러오는 쿼리
  const { data: profile_query, refetch } = useQuery(
    ['mypageProfile'],
    getMyProfile,
  );

  useEffect(() => {
    refetch();
    queryClient.invalidateQueries(['mypageProfile']);
    location.state
      ? setIsGosu(location.state?.gosu)
      : setIsGosu(profile_query?.gosu);
  }, [location]);

  // console.log(
  //   '마이페이지 바로 진입했을 때',
  //   location.state,
  //   'isGosu의 상태',
  //   isGosu,
  //   '실제 고수 여부',
  //   profile_query.gosu,
  // );

  return (
    <Wrap>
      <Container>
        <h1>마이페이지</h1>
        <Profile to="/mypage/account-info">
          <ProfileImg>
            {isGosu ? <RiUserStarLine /> : <RiUser3Line />}
          </ProfileImg>
          <div>
            <h5>
              {profile_query.username} {isGosu ? '고수' : '고객'}님
            </h5>

            <div>{profile_query.email}</div>
            {isGosu ? <button>고수</button> : null}
          </div>
        </Profile>
        <Coupon>
          <RiCoupon2Fill />
          <div>쿠폰함</div>
          <AiOutlineRight
            style={{ position: 'absolute', right: '10px', color: 'gray' }}
          />
        </Coupon>
        <List>
          <li>
            <h5>커뮤니티</h5>
            <div>
              <Link to="/mypage/community/posts">
                <BsChatRightText
                  style={{
                    marginRight: '10px',
                  }}
                />
                숨고생활 작성글
                <AiOutlineRight
                  style={{ position: 'absolute', right: '10px', color: 'gray' }}
                />
              </Link>
            </div>
          </li>
          <li>
            <h5>북마크</h5>
            <div>
              <Link to="/mypage/bookmark">
                <BsBookmarkStar
                  style={{
                    marginRight: '10px',
                  }}
                />
                북마크 바로가기
                <AiOutlineRight
                  style={{ position: 'absolute', right: '10px', color: 'gray' }}
                />
              </Link>
            </div>
          </li>
        </List>
      </Container>
    </Wrap>
  );
};

export default Mypage;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  h1 {
    margin: 80px 0;
    font-size: 38px;
  }
  width: 70%;
`;

const Profile = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  div div {
    color: #b5b5b5;
    margin-top: -10px;
    font-size: 14px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 15px;
  }
`;

const ProfileImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-right: 10px;
  width: 74px;
  height: 74px;
  svg {
    width: 60px;
    height: 60px;
  }
`;

const Coupon = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid #f2f2f2;
  border-radius: 0.5rem;
  background-color: #fafafa;
  margin: 20px 0;

  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 20px;
  position: relative;

  div {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 400;
  }
`;

const List = styled.ul`
  li {
    margin: 100px 0;
    position: relative;
    border-bottom: 1px solid #f4f4f4;

    h5 {
      font-weight: 600;
    }

    div {
      padding: 10px;
      color: #737373;
      font-size: 18px;
    }
  }
`;
