import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineRight } from 'react-icons/ai';
import { RiUserStarLine, RiUser3Line } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import apis from '../api/index';

const Accountinfo = () => {
  const params = useParams();

  const navigate = useNavigate();
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
      console.log(res.data);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  // 유저정보 불러오는 쿼리
  const profile_query = useQuery(['myInfoProfile'], getMyProfile, {
    onSuccess: (data) => {
      console.log('여기가 문젠가?', data.data);
    },
    onError: () => {
      console.error('에러 발생!');
    },
  });

  const onClickProfileEdit = () => {
    navigate(`/mypage/account-info/settings/${params.gosu}`, {
      state: profile_query.data.data,
    });
  };

  let phone;
  phone = profile_query.data.data.mobile ?? '';
  if (profile_query.data.data.mobile) {
    const phoneA = profile_query.data.data?.mobile.slice(0, 3);
    const phoneB = profile_query.data.data?.mobile.slice(3, 7);
    const phoneC = profile_query.data.data?.mobile.slice(7, 11);
    phone = phoneA + '-' + phoneB + '-' + phoneC;
  }

  return (
    <Wrap>
      <Container>
        <h1>계정 설정</h1>
        <ProfileImg>
          {params.gosu === 'true' ? <RiUserStarLine /> : <RiUser3Line />}
        </ProfileImg>
        <List>
          <li>
            <div
              style={{
                margin: '14px 0',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={onClickProfileEdit}
            >
              <div style={{ color: '#b5b5b5' }}>이름</div>
              <div style={{ marginTop: '10px' }}>
                {profile_query.data.data.username}
              </div>
              <AiOutlineRight
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '10px',
                  color: '#b5b5b5',
                }}
              />
            </div>
          </li>
          <li>
            <div style={{ margin: '14px 0', position: 'relative' }}>
              <div
                style={{ color: '#b5b5b5' }}
                onClick={() => {
                  // 모달창
                }}
              >
                이메일
              </div>
              <div style={{ marginTop: '10px' }}>
                {profile_query.data.data.email}
              </div>
            </div>
          </li>
          <li>
            <div
              style={{
                margin: '14px 0',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={onClickProfileEdit}
            >
              <div style={{ color: '#b5b5b5' }}>비밀번호</div>
              <div style={{ marginTop: '10px' }}>********</div>
              <AiOutlineRight
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '10px',
                  color: '#b5b5b5',
                }}
              />
            </div>
          </li>
          <li>
            <div
              style={{
                margin: '14px 0',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={onClickProfileEdit}
            >
              <div style={{ color: '#b5b5b5' }}>휴대전화번호</div>
              <div style={{ marginTop: '10px' }}>{phone}</div>
              <AiOutlineRight
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '10px',
                  color: '#b5b5b5',
                }}
              />
            </div>
          </li>
        </List>
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
  width: 70%;
`;

const ProfileImg = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 100px;
  margin: 80px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 10px;
  svg {
    width: 80px;
    height: 80px;
  }
`;

const List = styled.ul`
  li {
    position: relative;
    border-bottom: 1px solid #f4f4f4;

    div {
      color: #323232;
      font-size: 18px;
    }
  }
`;
