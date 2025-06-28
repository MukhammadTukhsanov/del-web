import { JSX, useEffect, useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import ConfirmOTP from './auth/confirm-otp';
import Login from './auth/login';

import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import { getCurrentUser, refreshToken } from './features/auth/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';

import LocationSelectorMap from './components/LocationSelectorMap/LocationSelectorMap';
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

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token: userToken } = useAppSelector((state) => state.user);
  const { token: otpToken } = useAppSelector((state) => state.otp);

  const isAuthenticated = Boolean(userToken || otpToken);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const dispatch = useAppDispatch();

  const { token: userToken, initialized } = useAppSelector((state) => state.user);
  const { token: otpToken } = useAppSelector((state) => state.otp);
  const token = userToken || otpToken;

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (token && initialized) {
      dispatch(getCurrentUser());
    }
  }, [token, initialized, dispatch]);

  if (!initialized) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/confirmOTP" element={<ConfirmOTP />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="basket" element={<Basket />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="market" element={<MarketPage />} />
        <Route path="location" element={<LocationSelectorMap />} />
      </Route>

      <Route path="*" element={<Navigate to={token ? '/' : '/login'} replace />} />
    </Routes>
  );
}

export default App;
