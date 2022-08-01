import React from 'react';
import apis from '../api';
import MainSlider from '../components/MainSlider';

const Home = () => {
  const getAuthInfo = async () => {
    try {
      const res = await apis.getAuth();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MainSlider />
      <div>
        <button onClick={getAuthInfo}>auth 불러오기</button>
      </div>
    </>
  );
};

export default Home;
