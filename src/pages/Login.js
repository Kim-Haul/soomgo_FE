import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import apis from '../api';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    try {
      const res = await apis.login(data);
      console.log(res);
      localStorage.setItem('TOKEN', res.data);
      alert('로그인 성공');
      navigate('/');
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
