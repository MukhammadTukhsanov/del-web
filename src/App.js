import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmOTP from './auth/confirm-otp.tsx';
import Login from './auth/login.tsx';
import NewPassword from './auth/new-password.tsx';
import Register from './auth/register.tsx';
import SendOTP from './auth/send-otp.tsx';
import Layout from './components/Layout.tsx';
import Basket from './screens/basket/index.tsx';
import Home from './screens/home/index.tsx';
import MarketPage from './screens/market-page/index.tsx';
import Orders from './screens/orders/index.tsx';
import Profile from './screens/profile/index.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='basket' element={<Basket />} />
          <Route path='orders' element={<Orders />} />
          <Route path='profile' element={<Profile />} />
          <Route path='market' element={<MarketPage />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='sendOTP' element={<SendOTP />} />
          <Route path='confirmOTP' element={<ConfirmOTP />} />
          <Route path='new-password' element={<NewPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
