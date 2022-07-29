import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import instance from '../shared/Request';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    console.log(data);
    // 비동기작업 시작
    try {
      const res = await instance.post('/api/signup', data);
      console.log(res);
      alert('회원가입 성공');
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>숨고에 오신 것을 환영합니다</h2>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <Form.Label>이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="이름(실명)을 입력해주세요"
          autoComplete="off"
          {...register('username', { required: '이름을 입력해주세요.' })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <Form.Label>이메일</Form.Label>
        <Form.Control
          type="email"
          placeholder="example@soomgo.com"
          autoComplete="off"
          {...register('email', {
            required: '올바른 이메일 주소를 입력해주세요.',
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && errors.email.type === 'required' && (
          <p>이메일을 입력해주세요.</p>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <p>올바른 이메일 주소를 입력해주세요.</p>
        )}

        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          placeholder="영문+숫자 조합 8자리 이상 입력해주세요"
          autoComplete="off"
          {...register('password', {
            required: true,
            minLength: 8,
            // pattern: 영문 + 숫자 정규식,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>비밀번호를 입력해주세요.</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>영문+숫자 조합 8자리 이상 입력해주세요.</p>
        )}

        <button disabled={!isValid}>회원가입</button>
        {/* <button>카카오톡으로 시작하기</button> */}
      </SignupForm>
    </div>
  );
};

export default Signup;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`;
