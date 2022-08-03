import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import apis from '../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faCommentDots,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { BsChatDotsFill } from 'react-icons/bs';
import { RiUser3Line } from 'react-icons/ri';

// 컴포넌트
const Detail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  // 댓글 입력 받기
  const comment_input = React.useRef('');

  // 게시글 상세정보 불러오기 api
  const getDetailData = async () => {
    try {
      const res = await apis.getDetailPost(postId);
      console.log(res.data);
      return res;
    } catch (e) {
      console.log(e);
    }
    // return axios.get(`http://localhost:5001/posts/${postId}`);
  };

  // 게시글 삭제 api
  const deletePost = async () => {
    try {
      const res = await apis.deletePost(postId);
      alert(res.data);
      navigate('/community/soomgo-life');
    } catch (e) {
      console.log(e);
      alert(e.response.data);
    }
  };

  // 댓글 목록 불러오기 api
  const getCommentsData = async () => {
    try {
      const res = await apis.getCommentsData(postId);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
    // return axios.get('http://localhost:5001/comments');
  };

  // 댓글 추가 api
  const addComment = async (data) => {
    try {
      const res = await apis.addComment(postId, data);
      alert(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
    // return axios.post('http://localhost:5001/comments', data);
  };

  // 댓글 삭제 api
  const deleteComment = async (commentId) => {
    try {
      const res = await apis.deleteComment(commentId);
      alert(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
    // return axios.delete(`http://localhost:5001/comments/${id}`);
  };

  // 좋아요 추가 api
  const postLiked = async () => {
    try {
      const res = await apis.addLike(postId);
    } catch (e) {
      console.log(e);
    }
  };

  // 좋아요 삭제 api
  const postUnLiked = async () => {
    try {
      const res = await apis.removeLike(postId);
    } catch (e) {
      console.log(e);
    }
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

  const onClickEdit = () => {
    navigate('/community/soomgo-life/post', { state: detail_query.data });
  };

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();

  // 게시글 상세정보 가져오기
  const { data: detail_query } = useQuery(['post_detail'], getDetailData, {
    onSuccess: (data) => {
      console.log('쿼리 불러오기', data);
    },
  });

  // 댓글 리스트 가져오기
  const { data: comments_query } = useQuery(
    ['comments_detail'],
    getCommentsData,
    {
      // onSuccess: (data) => {console.log('코멘트', data.data)},
    },
  );

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

  // 좋아요 + 1 즉각반영하기
  const { mutate: likedCnt } = useMutation(postLiked, {
    onSuccess: () => {
      // 게시글 세부내용 다시 불러오기!
      queryClient.invalidateQueries('post_detail');
    },
  });

  // 좋아요 - 1 즉각반영하기
  const { mutate: unliked } = useMutation(postUnLiked, {
    onSuccess: () => {
      // 게시글 세부내용 다시 불러오기!
      queryClient.invalidateQueries('post_detail');
    },
  });

  return (
    <Container>
      <DetialContainer>
        <TitleContainer>
          <Subject>커뮤니티 &gt; {detail_query.data.subject}</Subject>
          <Title>{detail_query.data.title}</Title>
          <Profile>
            <UserImg>
              <RiUser3Line />
            </UserImg>
            <UserWrap>
              <Username>{detail_query.data.writer}</Username>
              <User>
                {new Date(detail_query.data.createdAt).toLocaleString()}·조회{' '}
                {detail_query.data.viewCount}
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
                <ModalUl onClick={onClickEdit}>수정하기</ModalUl>
                <ModalUl onClick={deletePost}>삭제하기</ModalUl>
              </Modal>
            ) : null}
          </Profile>
          <Line />
        </TitleContainer>
        <BodyContainer>
          <Content>
            {detail_query.data.content.split('\n').map((line, idx) => {
              return <p key={idx}>{line}</p>;
            })}
            {detail_query.data.imgUrlList.map((src, idx) => (
              <img key={idx} src={src} alt="" />
            ))}
          </Content>
          <Tag>
            {detail_query.data.tagList.map((v, i) => {
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
            <Like
              onClick={() => {
                {
                  detail_query.data.liked ? unliked() : likedCnt();
                }
              }}
            >
              <Font>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  color={detail_query.data.liked ? '#00b39d' : 'gray'}
                />
              </Font>
              <FontContent liked={!!detail_query.data.liked}>
                좋아요 {detail_query.data.likeCount}
              </FontContent>
            </Like>
            <CommentCount>
              <Font>
                <FontAwesomeIcon icon={faCommentDots} />
              </Font>
              <FontContent>댓글 {detail_query.data.commentCount}</FontContent>
            </CommentCount>
          </Count>
          <Line />
        </BodyContainer>
        <CommentContainer>
          <Input>
            <Font style={{ marginLeft: '7px' }}>
              <BsChatDotsFill />
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
                    content: comment_input.current.value,
                  };

                  mutate(data);
                }}
              >
                등록
              </Btn>
            ) : null}
          </Input>

          {comments_query.data.map((v, i) => {
            return (
              <CommentBox key={i}>
                <CommentImg>
                  <RiUser3Line />
                </CommentImg>
                <div>
                  <CommentUser>{v.username}</CommentUser>
                  <CommentContent>{v.content}</CommentContent>
                  <CommentDate>
                    {new Date(v.createdAt).toLocaleString()}
                  </CommentDate>
                </div>
                <FontCommentbtn
                  onClick={() => {
                    onClickComment(i);
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} color="black" />
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
  img {
    display: block;
    margin: 0 auto;
  }
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
  color: ${({ liked }) => (liked ? '#00b39d;' : 'gray')};
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
  svg {
    width: 17px;
    height: 17px;
    margin-top: -5px;
    fill: #2d2d2d;
    transform: rotateY(180deg);
  }
`;

const CommentInput = styled.textarea`
  width: 90%;
  height: 40px;
  padding: 10px;
  font-size: 15px;
  border: none;
  margin-left: 5px;
  overflow: hidden;
  resize: none;

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  margin-right: 10px;
  svg {
    width: 34px;
    height: 34px;
  }
`;

const FontBtn = styled.button`
  position: absolute;
  right: 0px;
  padding: 4px 14px;
  border-radius: 50%;
  background: transparent;
  &:hover,
  &:focus {
    background: #eee;
  }
`;

const FontCommentbtn = styled.button`
  position: absolute;
  right: 0;
  padding: 1px 11px;
  border-radius: 50%;
  background: transparent;
  &:hover,
  &:focus {
    background: #eee;
  }
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
