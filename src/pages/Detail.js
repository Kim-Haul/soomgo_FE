import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faCommentDots,
  faCamera,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

// 컴포넌트
const Detail = () => {
  const { postId } = useParams();
  // 댓글 입력 받기
  const comment_input = React.useRef('');

  const getDetailData = () => {
    return axios.get(`http://localhost:5001/posts/${postId}`);
  };
  
  const getCommentsData = () => {
    return axios.get('http://localhost:5001/comments');
  };
  
  const addComment = (data) => {
    return axios.post('http://localhost:5001/comments', data);
  };
  
  const deleteComment = (id) => {
    return axios.delete(`http://localhost:5001/comments/${id}`);
  };

  // 등록 버튼 토글
  const [is_comment, setIsComment] = useState(false);
  const onCommentHandler = (event) => {
    if (event.currentTarget.value.length >= 1) {
      setIsComment(true);
    } else {
      setIsComment(false);
    }
  };

  // 수정 삭제 버튼 토글
  const [is_ClickPost, setClickPost] = useState(false);
  const [is_ClickComment, setClickComment] = useState(false);
  const [CommentIndex, setCommentIndex] = useState('');

  const onClickPost = () => {
    setClickPost((is_ClickPost) => !is_ClickPost);
  };

  const onClickComment = (i) => {
    setClickComment((is_ClickComment) => !is_ClickComment);
    setCommentIndex(i);
  };

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();

  // 게시글 상세정보 가져오기
  const detail_query = useQuery(['post_detail'], getDetailData, {
    onSuccess: (data) => {},
  });

  // 댓글 리스트 가져오기
  const comments_query = useQuery(['comments_detail'], getCommentsData, {
    onSuccess: (data) => {},
  });

  // 댓글 추가 하기
  const { mutate } = useMutation(addComment, {
    onSuccess: () => {
      // 댓글 리스트 다시 불러오기!
      queryClient.invalidateQueries('comments_query');
      comment_input.current.value = '';
    },
  });

  // 댓글 삭제 하기
  const { mutate: deleteCmt } = useMutation(deleteComment, {
    onSuccess: () => {
      // 댓글 리스트 다시 불러오기!
      queryClient.invalidateQueries('comments_query');
    },
  });

  return (
    <Container>
      <DetialContainer>
        <TitleContainer>
          <Subject>커뮤니티 &gt; {detail_query.data.data.subject}</Subject>
          <Title>{detail_query.data.data.title}</Title>
          <Profile>
            <Img></Img>
            <UserWrap>
              <Username>김재성</Username>
              <User>
                {detail_query.data.data.createdAt}·조회{' '}
                {detail_query.data.data.viewCount}
              </User>
            </UserWrap>
            <FontBtn
              onClick={() => {
                onClickPost();
              }}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} size="2x" />
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
          <Content>{detail_query.data.data.content}</Content>
          <Tag>
            {detail_query.data.data.tagList.map((v, i) => {
              return (
                <>
                  <Tagbutton key={i}>
                    <TagContent># {v}</TagContent>
                  </Tagbutton>
                </>
              );
            })}
          </Tag>
          <Count>
            <Like>
              <Font>
                <FontAwesomeIcon icon={faThumbsUp} />
              </Font>
              <FontContent>
                좋아요 {detail_query.data.data.commentCount}
              </FontContent>
            </Like>
            <CommentCount>
              {' '}
              <Font>
                <FontAwesomeIcon icon={faCommentDots} />
              </Font>
              <FontContent>댓글 {detail_query.data.data.likeCount}</FontContent>
            </CommentCount>
          </Count>
          <Line />
        </BodyContainer>
        <CommentContainer>
          <Input>
            <Font style={{ marginLeft: '7px' }}>
              <FontAwesomeIcon icon={faCamera} />
            </Font>
            <CommentInput
              placeholder="댓글을 남겨보세요"
              ref={comment_input}
              onChange={onCommentHandler}
            />
            {is_comment ? (
              <Btn
                onClick={() => {
                  const data = {
                    username: '새로운 댓글 작성자',
                    content: comment_input.current.value,
                    createdAt: '방금전',
                  };

                  mutate(data);
                }}
              >
                등록
              </Btn>
            ) : null}
          </Input>

          {comments_query.data.data.map((v, i) => {
            return (
              <CommentBox key={i}>
                <CommentImg></CommentImg>
                <div>
                  <CommentUser>{v.username}</CommentUser>
                  <CommentContent>{v.content}</CommentContent>
                  <CommentDate>{v.createdAt}</CommentDate>
                </div>
                <FontCommentbtn
                  onClick={() => {
                    onClickComment(i);
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </FontCommentbtn>
                {is_ClickComment && CommentIndex == i ? (
                  <CommentModal>
                    <CommentModalUl>수정하기</CommentModalUl>
                    <CommentModalUl
                      onClick={() => {
                        deleteCmt(v.id);
                      }}
                    >
                      삭제하기
                    </CommentModalUl>
                  </CommentModal>
                ) : null}
              </CommentBox>
            );
          })}
        </CommentContainer>
      </DetialContainer>
    </Container>
  );
};

export default Detail;

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

const Subject = styled.div`
  color: gray;
  font-size: 14px;
`;

const Title = styled.h4`
  margin: 20px 0;
  font-weight: 700;
`;

const Profile = styled.div`
  font-size: 12px;
  display: flex;
  position: relative;
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
const Tag = styled.div`
  display: flex;
`;

const Tagbutton = styled.button`
  margin: 30px 10px 30px 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  height: 30px;
  border-radius: 10px;
`;

const TagContent = styled.span`
  color: gray;
  font-size: 14px;
`;

const Count = styled.div`
  display: flex;
  font-size: 14px;
`;

const Font = styled.div`
  color: gray;
  font-weight: 500;
  margin-right: 3px;
`;

const FontContent = styled.div`
  color: gray;
  font-weight: 500;
`;

const Like = styled.div`
  display: flex;

  margin-right: 20px;
  cursor: pointer;
`;

const CommentCount = styled.div`
  display: flex;
  color: gray;
  font-weight: 500;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #f4f4f4;
  padding: 8px;
  border-radius: 10px;
`;

const CommentInput = styled.textarea`
  width: 90%;
  height: 40px;
  padding: 10px;
  font-size: 15px;
  border: none;
  margin-left: 5px;
  overflow: hidden;

  &:focus {
    outline: none;
  }
`;

const Btn = styled.div`
  color: #00c7ae;
  font-size: 14px;
  user-select: none;
  cursor: pointer;
`;

const CommentBox = styled.div`
  display: flex;
  padding: 5px;
  margin-top: 20px;
  position: relative;
`;

const CommentImg = styled.div`
  border: 1px solid gray;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const FontCommentbtn = styled.button`
  background-color: transparent;
  position: absolute;
  right: 40px;
`;

const CommentUser = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

const CommentContent = styled.div`
  font-size: 14px;
  margin: 10px 0;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: gray;
`;

const CommentModal = styled.div`
  border: 1px solid #f4f4f4;
  background-color: white;
  border-radius: 5px;
  width: 150px;
  position: absolute;
  top: 40px;
  right: 30px;
  z-index: 10;
`;

const CommentModalUl = styled.ul`
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #00c7ae;
  }
`;
