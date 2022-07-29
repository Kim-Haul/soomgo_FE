import React from 'react';
import apis from '../api';

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
    <div>
      <button onClick={getAuthInfo}>auth 불러오기</button>
    </div>
  );
};

export default Home;
