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
import LocationSelectorMap from './components/LocationSelectorMap';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const dispatch = useAppDispatch();

  const { token: userToken, loading } = useAppSelector((state) => state.user);
  const { token: otpToken } = useAppSelector((state) => state.otp);

  const token = userToken || otpToken;

  // Refresh token on app load
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  // Load user info if token exists
  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [token, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      {!token && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/confirmOTP" element={<ConfirmOTP />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}

      {/* Private Routes */}
      {token && (
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="basket" element={<Basket />} />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="profile" element={<Profile />} />
          <Route path="market" element={<MarketPage />} />
          <Route path="location" element={<LocationSelectorMap />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
