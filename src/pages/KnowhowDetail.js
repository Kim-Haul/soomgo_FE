import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const KnowhowDetail = () => {
  // 수정 삭제 버튼 토글
  const [is_ClickPost, setClickPost] = useState(false);
  const onClickPost = () => {
    setClickPost((is_ClickPost) => !is_ClickPost);
  };

  // 고수 게시글 내용 가져오기
  const getDetailData = () => {
    return axios.get(`http://localhost:5001/posts`);
  };

  return (
    <Container>
      <DetialContainer>
        <TitleImg></TitleImg>
        <TitleContainer>
          <Title>센트럴파크 24평 입주청소</Title>
          <Profile>
            <Img></Img>
            <UserWrap>
              <Username>김재성</Username>
              <User>2022.08.01</User>
            </UserWrap>
            <FontBtn
              onClick={() => {
                onClickPost();
              }}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                size="2x"
                color="black"
              />
            </FontBtn>
            {is_ClickPost ? (
              <Modal>
                <ModalUl>수정하기</ModalUl>
                <ModalUl>삭제하기</ModalUl>
              </Modal>
            ) : null}
          </Profile>
          <Line />
        </TitleContainer>
        <BodyContainer>
          <Content>내용</Content>
          <Line />
        </BodyContainer>
        <Profile>
          <Img></Img>
          <UserWrap>
            <Username>김재성</Username>
            <User>2022.08.01</User>
          </UserWrap>
          <div>
            <button>견적 요청</button>
          </div>
        </Profile>
      </DetialContainer>
    </Container>
  );
};

export default KnowhowDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DetialContainer = styled.section`
  display: flex;
  flex-direction: column;

  margin-top: 50px;
  padding: 10px;
  width: 70%;
`;

const TitleContainer = styled.div``;

const TitleImg = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid black;
`;

const Title = styled.h4`
  margin: 20px 0;
  font-weight: 700;
`;

const Profile = styled.div`
  font-size: 12px;
  display: flex;
  position: relative;

  div button {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
  }
`;
const Img = styled.div`
  border: 1px solid gray;
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

const UserWrap = styled.div`
  font-size: 12px;
  margin-top: 3px;
`;

const FontBtn = styled.button`
  background-color: transparent;
  position: absolute;
  right: 0px;
`;

const Modal = styled.div`
  border: 1px solid #f4f4f4;
  background-color: white;
  border-radius: 5px;
  width: 150px;
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 10;
`;

const ModalUl = styled.ul`
  padding: 5px;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #00c7ae;
  }
`;

const Username = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const User = styled.div`
  color: gray;
`;

const Line = styled.hr`
  height: 1px;
  width: 100%;
`;

const BodyContainer = styled.div``;
const Content = styled.div`
  margin: 20px 0;
`;
