import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

import apis from '../api';
import { RiErrorWarningFill } from 'react-icons/ri';

const Settings = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const profileData = location.state;
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인 한 유저만 이용할 수 있습니다.');
      navigate('/login');
    }
  }, []);
  if (!isLoggedIn) return;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    try {
      const res = await apis.editAuth(data);
      window.alert('정보 수정이 완료되었습니다!');
      navigate(`/mypage/account-info/${params.gosu}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrap>
      <Container>
        <h1>정보 수정</h1>
        <div
          style={{
            backgroundColor: '#f2f2f2',
            width: '100%',
            padding: '20px',
            height: '60px',
            borderRadius: '10px',
            display: 'flex',

            alignItems: 'center',
          }}
        >
          <RiErrorWarningFill />
          이름(실명)을 사용하시면 고용율이 150% 상승합니다
        </div>

        {/* 폼태그 */}
        <ProfileForm onSubmit={handleSubmit(onSubmit)}>
          <label style={{ marginBottom: '-15px' }}>이름</label>
          <Form.Control
            type="text"
            autoComplete="off"
            defaultValue={profileData.username}
            isInvalid={!!errors.username}
            {...register('username', {
              required: '이름을 입력해주세요.',
            })}
          />
          {errors.username && (
            <div
              style={{ marginTop: '-10px', marginBottom: '10px', color: 'red' }}
            >
              {errors.username.message}
            </div>
          )}
          <label style={{ marginBottom: '-15px' }}>비밀번호</label>
          <Form.Control
            type="password"
            autoComplete="off"
            isInvalid={!!errors.password}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: 8,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <div
              style={{ marginTop: '-10px', marginBottom: '10px', color: 'red' }}
            >
              {errors.password.message}
            </div>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <div
              style={{ marginTop: '-10px', marginBottom: '10px', color: 'red' }}
            >
              영문+숫자 조합 8자리 이상 입력해주세요.
            </div>
          )}
          <label style={{ marginBottom: '-15px' }}>휴대전화</label>
          <Form.Control
            type="text"
            autoComplete="off"
            isInvalid={!!errors.mobile}
            defaultValue={profileData.mobile}
            placeholder="'-'는 빼고 입력해주세요."
            {...register('mobile', {
              required: '휴대전화를 입력해주세요.',
            })}
          />
          {errors.mobile && (
            <div
              style={{ marginTop: '-10px', marginBottom: '10px', color: 'red' }}
            >
              {errors.mobile.message}
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              right: '0px',
              bottom: '-20px',
            }}
          >
            <Link to={`/mypage/account-info/${params.gosu}`}>
              <button
                style={{
                  marginRight: '15px',
                  backgroundColor: 'white',
                  color: '#00c7ae',
                  border: '1px solid #e1e1e1',
                }}
              >
                취소
              </button>
            </Link>
            <button>수정 완료</button>
          </div>
        </ProfileForm>
      </Container>
    </Wrap>
  );
};

export default Settings;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  margin-bottom: 50px;

  h1 {
    margin: 80px 0;
    font-size: 38px;
  }
  width: 70%;

  svg {
    margin-right: 10px;
    fill: black;
    font-size: 20px;
  }

  button {
    width: 150px;
    height: 50px;
    font-size: 18px;
  }
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  label {
    font-size: 18px;
  }

  input {
    margin: 20px 0;
    height: 50px;
  }
`;
