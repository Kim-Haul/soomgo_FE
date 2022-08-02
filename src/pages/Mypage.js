import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsChatRightText, BsBookmarkStar } from 'react-icons/bs';
import { RiCoupon2Fill } from 'react-icons/ri';
import { AiOutlineRight } from 'react-icons/ai';
import apis from '../api/index';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Mypage = () => {
  // 유저정보 불러오기 api
  const getMyProfile = async () => {
    try {
      const res = await apis.getAuth();
      console.log(res.data);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  // 유저정보 불러오는 쿼리
  const profile_query = useQuery(['my_profile'], getMyProfile, {
    onSuccess: (data) => {
      console.log('여기가 문젠가?', data.data);
    },
    onError: () => {
      console.error('에러 발생!');
    },
  });

  return (
    <Wrap>
      <Container>
        <h1>마이페이지</h1>
        <Profile to="/mypage/account-info">
          <ProfileImg></ProfileImg>
          <div>
            <h5>{profile_query.data.data.username} 고객님</h5>

            <div>{profile_query.data.data.email}</div>
            {profile_query.data.data.gosu ? <button>고수</button> : null}
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
  border: 1px solid black;
  margin-right: 10px;
  width: 74px;
  height: 74px;
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
