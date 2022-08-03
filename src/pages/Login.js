import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import apis from '../api';

// import { useDispatch } from 'react-redux/es/exports';
// import { AddUser } from '../redux/modules/userSlice';

const Login = () => {
  const [login, setLogin] = useState(false);
  // const dispatch = useDispatch();
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
      // dispatch(
      //   AddUser({
      //     username: res.data.username,
      //     gosu: res.data.gosu,
      //   }),
      // );
      alert('로그인 성공');
      navigate('/', { state: login });
      // setLogin(true); 얘를 안넣어줘도 헤더에서 자동 업데이트가 되네. 흠.
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
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

        <button disabled={!isValid}>이메일 로그인</button>
        <button className="btn-kakao">Kakao로 시작하기</button>
        <Link to="/signup">계정이 없으신가요?</Link>
      </SignupForm>
    </div>
  );
};

export default Login;

const SignupForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 60%;
  button {
    margin-top: 10px;
    &.btn-kakao {
      background: #fee500;
      color: #050101;
    }
    &:disabled {
      background: #eee;
      cursor: default;
      &:hover {
        filter: none;
      }
    }
  }
`;
