import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { categories } from '../data';
import { MdAddAPhoto } from 'react-icons/md';

const Post = () => {
  const [isGosu, setIsGosu] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'all',
  });

  const onSubmitPost = (data) => {
    console.log(data);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmitPost)}>
        <Row>
          <select
            name="subject"
            id="subject"
            {...register('subject', {
              required: true,
            })}
          >
            <option selected disabled value="">
              주제 선택
            </option>
            {categories.slice(1).map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.text}
              </option>
            ))}
            {isGosu && <option>고수의노하우</option>}
          </select>
          <button disabled={!isValid}>등록</button>
        </Row>

        <Row className="row-photo">
          <MdAddAPhoto />
          <span>0/2</span>
        </Row>

        <Row>
          <input
            type="text"
            id="input-title"
            placeholder="제목을 입력해주세요."
            autoComplete="off"
            {...register('title', {
              required: true,
            })}
          />
        </Row>

        <Row>
          <input
            type="text"
            id="input-title"
            placeholder="태그를 입력해주세요."
          />
        </Row>

        <RowPreview>사진 미리보기</RowPreview>

        <Row>
          <textarea
            wrap="hard"
            spellCheck="false"
            placeholder={`요청 서비스 정보를 공유하거나 숨고인과 고수님들에게 물어보세요.\n주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되어 일정 수 이상 신고를 받는 경우 글이 숨김 및 삭제될 수 있습니다.`}
            {...register('content', {
              required: true,
            })}
          />
        </Row>
      </form>
    </section>
  );
};

export default Post;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f4f4f4;
  font-size: 14px;
  &:last-child {
    border: none;
  }
  &.row-photo {
    justify-content: flex-start;
    padding: 16px 10px;
    background: #fafafa;
    border-top: 1px solid #f4f4f4;
    svg {
      width: 20px;
      height: 20px;
      margin-right: 7px;
      cursor: pointer;
    }
    span {
      color: #888;
      font-size: 15px;
      font-weight: 500;
    }
  }
  select {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  button {
    background: none;
    color: #00c7ae;
    font-size: 16px;
    font-weight: 500;
    &:disabled {
      color: #c5c5c5;
      cursor: default;
      &:hover {
        filter: none;
      }
    }
  }
  #input-title {
    padding: 4px 0;
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.3px;
    &::placeholder {
      color: #888;
    }
  }
  textarea {
    width: 100%;
    height: 325px;
    padding: 10px 0;
    resize: none;
    font-size: 14px;
    &::placeholder {
      color: #888;
    }
  }
`;

const RowPreview = styled.div`
  padding-top: 12px;
`;
