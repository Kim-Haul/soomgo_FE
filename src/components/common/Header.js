import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apis from '../../api/index';

// import { useSelector } from 'react-redux/es/exports';
// import { useDispatch } from 'react-redux/es/exports';

const Header = () => {
  // const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const authCheck = localStorage.getItem('TOKEN');
    const getMyProfile = async () => {
      try {
        const res = await apis.getAuth();
        setProfileData(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (authCheck) {
      setIsLoggedIn(true);
      getMyProfile();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  // 로그아웃시 헤더만 리프레쉬
  // 페이지 전체를 reload 하는거보단 헤더만 reload 되는게 클라이언트 측에서 보기 자연스러움.
  // useState를 사용하면 변수 값이 바뀔 때마다 해당 변수가 사용된 component의 DOM이 알아서 업데이트 됨 !
  const [check, setCheck] = useState(false);

  // login 페이지에서 useState 사용 값 넘겨받기 -> 헤더만 업데이트
  // 근데 location.state 값이 변경되지 않는데 어떻게 헤더만 업데이트되지? 되긴 되는데 이유를 모르겠음.
  // const location = useLocation();
  // const profileData = location.state;
  // console.log(profileData);

  // 계정설정 모달창 토글
  const [is_mypage, setIsMypage] = useState(false);
  const onClickMypage = () => {
    setIsMypage(!is_mypage);
  };

  // 마이페이지 클릭시 이동
  const navigate = useNavigate();

  // 이렇게 하니까 로그인 안했을 때 토큰 값이 없어서 오류.
  // 로그인할때 유저정보를 받아 오는걸로 하고, 리덕스로 상태관리를 하면 ??..

  // // 유저정보 불러오기 api
  // const getMyProfile = async () => {
  //   try {
  //     const res = await apis.getAuth();
  //     return res;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // // 유저정보 불러오는 쿼리
  // const profile_query = useQuery(['my_profile'], getMyProfile, {
  //   onSuccess: (data) => {
  //     // console.log(data.data);
  //   },
  //   onError: () => {
  //     console.error('에러 발생!');
  //   },
  // });

  // 리덕스 툴킷 사용, 유저 이름 받아오기
  // const user = useSelector((state) => state.user);
  // console.log('제발 툴킷정보를 불러와주세요', user);

  // 고수 전환 요청 api
  const acoountToggle = async () => {
    try {
      const res = await apis.toggleRole();
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  // 쿼리 클라이언트 정의
  const queryClient = useQueryClient();

  // 고수 전환 요청 쿼리
  const { mutate: Toggle } = useMutation(acoountToggle, {
    onSuccess: () => {
      // 유저정보 쿼리 다시 불러오기!
      // queryClient.invalidateQueries('profile_query');
      setProfileData({ ...profileData, gosu: !profileData.gosu });
    },
  });

  return (
    <HeaderComponent>
      <Navbar>
        <NavLeft>
          <Link to="/">
            <img
              src="/images/icon-navi-logo.svg"
              alt="숨고 메인페이지로 가기"
            />
          </Link>
        </NavLeft>

        {isLoggedIn ? (
          <NavRight>
            <ul>
              <li>
                <Link to="/community/soomgo-life">커뮤니티</Link>
              </li>
              <li>
                <Link to="/mypage/bookmark">북마크</Link>
              </li>

              <li>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onClickMypage();
                  }}
                >
                  계정설정
                </div>
              </li>
              {is_mypage ? (
                <Modal>
                  <Wrap>
                    <h4 style={{ fontSize: '18px', color: 'gray' }}>
                      {profileData.username}
                      {profileData.gosu ? '고수' : '고객'}님
                    </h4>
                    <div
                      style={{
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'center',
                      }}
                      onClick={() => {
                        navigate('/mypage');
                        setIsMypage(false);
                      }}
                    >
                      마이페이지
                    </div>
                    <hr />
                    {profileData.gosu ? (
                      <button
                        onClick={() => {
                          Toggle();
                          queryClient.invalidateQueries(['mypageProfile'], { refetchType: 'all' });
                          alert('고객으로 전환되었습니다.');
                          navigate('/mypage', {state: {gosu: false}});
                        }}
                      >
                        고객으로 전환
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          Toggle();
                          queryClient.invalidateQueries(['mypageProfile']);
                          alert('고수 유저로 전환되었습니다.');
                          navigate('/mypage', {state: {gosu: true}});
                        }}
                      >
                        고수로 전환
                      </button>
                    )}
                  </Wrap>
                </Modal>
              ) : null}
              <button
                className="btn-gosu"
                onClick={() => {
                  localStorage.removeItem('TOKEN');
                  setCheck(!check);
                  setIsLoggedIn(false);
                  alert('로그아웃 되었습니다.');
                  navigate('/');
                }}
              >
                로그아웃
              </button>
            </ul>
          </NavRight>
        ) : (
          <NavRight>
            <ul>
              <li>
                <Link to="/community/soomgo-life">커뮤니티</Link>
              </li>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="btn-gosu">회원가입</button>
                </Link>
              </li>
            </ul>
          </NavRight>
        )}
      </Navbar>
    </HeaderComponent>
  );
};

export default Header;

const HeaderComponent = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
  z-index: 100;
`;

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  max-width: 970px;
  height: 72px;
  margin: 0 auto;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const NavRight = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  ul {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  button.btn-gosu {
    min-width: 80px;
    height: 36px;
    padding: 6.5px 0;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 60px;
  right: 40px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 180px;
  border: 1px solid gray;
  padding: 20px;
  position: relative;
  background-color: white;

  div {
    margin-top: 10px;
  }
  hr {
    width: 100%;
  }

  button {
    position: absolute;
    width: 80%;
    bottom: 10px;
  }
`;
