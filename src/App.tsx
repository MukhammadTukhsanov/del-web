import React, { use, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ConfirmOTP from './auth/confirm-otp';
import Login from './auth/login';
import Layout from './components/Layout';
import ProtectedRoute from './features/protectedRoute';
import Basket from './screens/basket';
import Home from './screens/home';
import MarketPage from './screens/market-page';
import Orders from './screens/orders';
import Profile from './screens/profile';
import { useAppDispatch, useAppSelector } from './hooks';
import { getCurrentUser, refreshToken } from './features/auth/authSlice';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const dispatch = useAppDispatch();
  const tokenLoading = useAppSelector((state) => state.auth.tokenLoading);
  const token = useAppSelector((state) => state.auth.token);
  const error = useAppSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [token, dispatch]);

  if(tokenLoading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
              <Home />
          }
        />
        <Route
          path='basket'
          element={
              <Basket />
          }
        />
        <Route
          path='orders'
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile'
          element={
              <Profile />
          }
        />
        <Route
          path='market'
          element={
              <MarketPage />
          }
        />
        <Route path='login' element={<Login />} />
        <Route path='confirmOTP' element={<ConfirmOTP />} />
      </Route>
    </Routes>
  );
}

export default App;
