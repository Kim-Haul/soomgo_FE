import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import apis from '../api';

import { useDispatch } from 'react-redux';
import {
  AddUser,
  toggleLoggedIn,
  toggleGosu,
} from '../redux/modules/userSlice';

const Login = () => {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setFocus('email');
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await apis.login(data);
      console.log('로그인정보 찍어보기', res.data);
      localStorage.setItem('TOKEN', res.data.token);
      dispatch(toggleLoggedIn(true));
      dispatch(toggleGosu(res.data.gosu));
      // dispatch(
      //   AddUser({
      //     username: res.data.username,
      //     gosu: res.data.gosu,
      //   }),
      // );
      alert('로그인 성공');
      navigate('/', { state: login });
      // window.location.replace('/');
      // setLogin(true); 얘를 안넣어줘도 헤더에서 자동 업데이트가 되네. 흠.
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LoginSection>
      <h2>로그인</h2>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Form.Label>이메일</Form.Label>
        <Form.Control
          type="email"
          placeholder="example@soomgo.com"
          autoComplete="off"
          isInvalid={!!errors.email}
          {...register('email', {
            required: '이메일 주소를 입력해주세요.',
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && errors.email.type === 'required' && (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <Form.Text className="text-danger">
            올바른 이메일 주소를 입력해주세요.
          </Form.Text>
        )}

        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="off"
          isInvalid={!!errors.password}
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
        />
        {errors.password && (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}

        <button disabled={!isValid} className="btn-login">
          이메일 로그인
        </button>
        <a
          rel="noreferrer"
          href="http://52.78.157.63/oauth2/authorization/kakao"
        >
          <button type="button" className="btn-kakao">
            <img src="/images/icon-kakaotalk.svg" alt="" />
            Kakao로 시작하기
          </button>
        </a>

        <Link to="/signup" className="link-signup">
          계정이 없으신가요?
        </Link>
      </LoginForm>
    </LoginSection>
  );
};

export default Login;

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 80px 0;
  h2 {
    margin-bottom: 40px;
    text-align: center;
    font-weight: 500;
  }
  button {
    width: 100%;
    margin-top: 10px;
    &.btn-login {
      margin-top: 40px;
    }
    &.btn-kakao {
      background: #fee500;
      color: #050101;
      img {
        margin: -3px 6px 0 0;
      }
    }
    &:disabled {
      background: #ddd;
      cursor: default;
      &:hover {
        filter: none;
      }
    }
  }
  a.link-signup {
    margin-top: 20px;
    color: #737373;
    text-align: center;
  }
`;

const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 424px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  background: #fafafa;
`;
