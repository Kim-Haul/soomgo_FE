import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    console.log(data);
    // 비동기작업 시작
  };

  return (
    <div>
      <h2>숨고에 오신 것을 환영합니다</h2>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <label>이름</label>
        <input
          type="text"
          placeholder="이름(실명)을 입력해주세요"
          {...register('username', { required: '이름을 입력해주세요.' })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <label>이메일</label>
        <input
          type="email"
          placeholder="example@soomgo.com"
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

        <label>비밀번호</label>
        <input
          type="password"
          placeholder="영문+숫자 조합 8자리 이상 입력해주세요"
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
