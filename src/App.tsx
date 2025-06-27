import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmOTP from './auth/confirm-otp';
import Login from './auth/login';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { getCurrentUser, refreshToken } from './features/auth/userSlice';
import ProtectedRoute from './features/protectedRoute';
import { useAppDispatch, useAppSelector } from './hooks';
import Basket from './screens/basket';
import Home from './screens/home';
import MarketPage from './screens/market-page';
import Orders from './screens/orders';
import Profile from './screens/profile';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.user.token);
  const otpToken = useAppSelector((state) => state.otp.token);
  const loading = useAppSelector((state) => state.user.loading);
  const token = userToken || otpToken;

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;

    dispatch(getCurrentUser());
  }, [token, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path='/login' element={token ? <Navigate to='/' replace /> : <Login />} />
      <Route path='/confirmOTP' element={token ? <Navigate to='/' replace /> : <ConfirmOTP />} />
      {token ? (
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='basket' element={<Basket />} />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path='profile' element={<Profile />} />
          <Route path='market' element={<MarketPage />} />
        </Route>
      ) : (
        <Route path='*' element={<Navigate to='/login' replace />} />
      )}
    </Routes>
  );
}

export default App;
