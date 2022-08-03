import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { RiUserStarLine } from 'react-icons/ri';

import apis from '../api/index';

const KnowhowDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // 수정 삭제 버튼 토글
  const [is_ClickPost, setClickPost] = useState(false);
  const onClickPost = () => {
    setClickPost((is_ClickPost) => !is_ClickPost);
  };

  const getKnowhowDetail = async () => {
    try {
      const res = await apis.getDetailPost(postId);
      return res.data;
    } catch (e) {
      console.log(e);
    }
    // return axios.get(`http://localhost:5001/posts/${postId}`);
  };

  const addBm = async () => {
    try {
      const res = await apis.addBookmark(postId);
      console.log(res);
      alert(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const removeBm = async () => {
    try {
      const res = await apis.removeBookmark(postId);
      console.log(res);
      alert(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const knowhowInfo = useQuery(['knowhowDetail'], getKnowhowDetail, {
    refetchOnWindowFocus: false,
  }).data;
  console.log(knowhowInfo);

  const onClickEditPost = () => {
    navigate('/community/soomgo-life/post', { state: knowhowInfo });
  };

  const onClickDeletePost = async () => {
    try {
      const res = await apis.deletePost(postId);
      alert(res.data);
      navigate('/community/pro-knowhow');
    } catch (e) {
      console.log(e);
      alert(e.response.data);
    }
  };

  const { mutate: onClickAddBm } = useMutation(addBm, {
    onSuccess: () => {
      queryClient.invalidateQueries('bookmark');
    }
  })

  const { mutate: onClickRemoveBm } = useMutation(removeBm, {
    onSuccess: () => {
      queryClient.invalidateQueries('bookmark');
    }
  })

  return (
    <Container>
      <DetialContainer>
        <TitleImg>
          <img src={`${knowhowInfo.imgUrlList[0]}`} alt="" />
        </TitleImg>
        <TitleContainer>
          <Title>{knowhowInfo.title}</Title>
          <Profile>
            <UserImg>
              <RiUserStarLine />
            </UserImg>
            <UserWrap>
              <Username>{knowhowInfo.writer}</Username>
              <User>
                {new Date(knowhowInfo.createdAt).toLocaleDateString()}
              </User>
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
                <ModalUl onClick={onClickEditPost}>수정하기</ModalUl>
                <ModalUl onClick={onClickDeletePost}>삭제하기</ModalUl>
              </Modal>
            ) : null}
          </Profile>
          <Line />
        </TitleContainer>
        <BodyContainer>
          <Content>
            {knowhowInfo.content.split('\n').map((line, idx) => {
              return <p key={idx}>{line}</p>;
            })}
          </Content>
          <Line />
        </BodyContainer>
        <Profile>
          <UserImg>
            <RiUserStarLine />
          </UserImg>
          <UserWrap>
            <Username>{knowhowInfo.writer}</Username>
            <User>고수</User>
          </UserWrap>
          <BookmarkContainer>
            {knowhowInfo.bookmark ? (
              <button onClick={onClickRemoveBm}>
                <FaBookmark />
                북마크
              </button>
            ) : (
              <button onClick={onClickAddBm} className="false">
                <FaRegBookmark />
                북마크
              </button>
            )}
          </BookmarkContainer>
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
  img {
    width: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h3`
  margin: 24px 0;
  font-size: 28px;
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
    /* font-size: 16px; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
  }
`;
const UserImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  margin-right: 10px;
  svg {
    width: 36px;
    height: 36px;
  }
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
  margin: 20px 0 60px;
`;

const BookmarkContainer = styled.div`
  button {
    font-weight: 600;
    font-size: 14px;
    svg {
      margin-right: 4px;
    }
    &.false {
      background: #eaeaea;
      color: #323232;
    }
  }
`;
