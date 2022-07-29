import React from 'react';
import instance from '../shared/Request';

const Home = () => {
  const getAuth = async () => {
    try {
      const res = await instance.get('/api/auth');
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={getAuth}>auth 불러오기</button>
    </div>
  );
};

export default Home;
