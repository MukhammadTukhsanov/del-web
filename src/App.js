import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
