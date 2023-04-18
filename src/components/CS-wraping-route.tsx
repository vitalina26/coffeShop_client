import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { verifyJwt } from '../slices/auth-slice';
import Home from '../pages/Home';


const WrapingRoute = ({ page }: { page: JSX.Element }) => {
  const {  isVerifed, jwt } = useAppSelector((state) => state.auth
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!jwt || !jwt?.token) return;

    dispatch(verifyJwt(jwt.token));
  }, [jwt]);

  return isVerifed ? page : <Home/>;
};

export default WrapingRoute;