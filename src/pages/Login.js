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
  } = useForm({ mode: 'onChange' });

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
      <h2>숨고에 오신 것을 환영합니다</h2>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <Form.Label>이메일</Form.Label>
        <Form.Control
          type="email"
          placeholder="example@soomgo.com"
          autoComplete="off"
          {...register('email', {
            required: true,
          })}
        />
        {errors.email && errors.email.type === 'required' && (
          <p>이메일 주소를 입력해주세요.</p>
        )}

        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="off"
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>비밀번호를 입력해주세요.</p>
        )}

        <button disabled={!isValid}>이메일 로그인</button>
        <button>카카오톡으로 시작하기</button>
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
`;
