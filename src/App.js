import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyle';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Detail from './pages/Detail';
import Community from './pages/Community';
import Life from './pages/Life';
import Knowhow from './pages/Knowhow';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/community" element={<Community />}>
            <Route path="/community/soomgo-life" element={<Life />} />
            <Route path="/community/pro-knowhow" element={<Knowhow />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
