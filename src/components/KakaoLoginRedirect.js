import React, { useEffect } from 'react';
import { useParams } from 'react-router';

const KakaoLoginRedirect = () => {
  const params = useParams();

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('TOKEN', `BEARER ${params.token}`);
    window.location.replace('/');
  }, []);

  return <></>;
};

export default KakaoLoginRedirect;
