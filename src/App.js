import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyle';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Accountinfo from './pages/Accountinfo';
import Mypage from './pages/Mypage';
import Detail from './pages/Detail';
import Community from './components/community/CommunityLayout';
import Life from './pages/Life';
import Knowhow from './pages/Knowhow';
import Post from './pages/Post';
import Bookmarkclip from './pages/Bookmarkclip';
import Mypageactivity from './components/Mypageactivity';
import Mypost from './pages/Mypost';
import MyComment from './pages/MyComment';
import KnowhowDetail from './pages/KnowhowDetail';
import Settings from './pages/Settings';
import KakaoLoginRedirect from './components/KakaoLoginRedirect';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/account-info/:gosu" element={<Accountinfo />} />
          <Route
            path="/mypage/account-info/settings/:gosu"
            element={<Settings />}
          />
          <Route path="/mypage/bookmark" element={<Bookmarkclip />} />
          <Route path="/mypage/community" element={<Mypageactivity />}>
            <Route path="/mypage/community/posts" element={<Mypost />} />
            <Route path="/mypage/community/comments" element={<MyComment />} />
          </Route>

          <Route path="/community" element={<Community />}>
            <Route path="/community/soomgo-life" element={<Life />} />
            <Route path="/community/pro-knowhow" element={<Knowhow />} />
          </Route>
          <Route
            path="/community/soomgo-life/posts/:postId"
            element={<Detail />}
          />
          <Route
            path="/community/pro-knowhow/posts/:postId"
            element={<KnowhowDetail />}
          />
          <Route path="/community/soomgo-life/post" element={<Post />} />
        </Route>

        <Route
          path="/oauth2/redirect/:token"
          element={<KakaoLoginRedirect />}
        />
      </Routes>
    </>
  );
};

export default App;
