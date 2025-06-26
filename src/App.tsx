import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { useEffect } from 'react';
import { getCurrentUser, logout, refreshToken } from './features/auth/userSlice';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const loading = useAppSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;
    
    dispatch(getCurrentUser());
  }, [token, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <div>
      Auth user page view
    </div>;
  }

  return <>
  User
  {token}
  <hr />
  <button
    onClick={() => {
      dispatch(logout());
    }}
  >Logout</button>
  </>

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
