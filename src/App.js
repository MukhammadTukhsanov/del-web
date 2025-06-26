import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmOTP from './auth/confirm-otp.tsx';
import Login from './auth/login.tsx';
import Layout from './components/Layout.tsx';
import ProtectedRoute from './features/protectedRoute/index.tsx';
import Basket from './screens/basket/index.tsx';
import Home from './screens/home/index.tsx';
import MarketPage from './screens/market-page/index.tsx';
import Orders from './screens/orders/index.tsx';
import Profile from './screens/profile/index.tsx';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='basket'
          element={
            <ProtectedRoute>
              <Basket />
            </ProtectedRoute>
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
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='market'
          element={
            <ProtectedRoute>
              <MarketPage />
            </ProtectedRoute>
          }
        />
        <Route path='login' element={<Login />} />
        <Route path='confirmOTP' element={<ConfirmOTP />} />
      </Route>
    </Routes>
  );
}

export default App;
