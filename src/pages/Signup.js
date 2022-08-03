import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import apis from '../api';

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    try {
      const res = await apis.signup(data);
      console.log(res);
      alert('회원가입 성공');
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignupSection>
      <h1>숨고에 오신 것을 환영합니다</h1>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <Form.Label>이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="이름(실명)을 입력해주세요"
          autoComplete="off"
          isInvalid={!!errors.username}
          {...register('username', { required: '이름을 입력해주세요.' })}
        />
        {errors.username && (
          <Form.Text className="text-danger">
            {errors.username.message}
          </Form.Text>
        )}

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
          placeholder="영문+숫자 조합 8자리 이상 입력해주세요"
          autoComplete="off"
          isInvalid={!!errors.password}
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: 8,
            // TODO: pattern: 영문 + 숫자 정규식,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <Form.Text className="text-danger">
            영문+숫자 조합 8자리 이상 입력해주세요.
          </Form.Text>
        )}

        <button disabled={!isValid}>회원가입</button>
        <a
          rel="noreferrer"
          href="http://52.78.157.63/oauth2/authorization/kakao"
        >
          <button type="button" className="btn-kakao">
            Kakao로 가입하기
          </button>
        </a>
      </SignupForm>
    </SignupSection>
  );
};

export default Signup;

const SignupSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  button {
    width: 100%;
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

const SignupForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
`;
