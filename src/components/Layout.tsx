// src/components/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  const location = useLocation();

  const hideBottomNavRoutes = [
    '/basket',
    '/login',
    '/register',
    '/sendOTP',
    '/confirmOTP',
    '/new-password',
  ];

  const shouldHideBottomNav = hideBottomNavRoutes.includes(location.pathname);

  return (
    <div style={{ height: '100vh' }}>
      {' '}
      <Outlet />
      {!shouldHideBottomNav && <BottomNav />}
    </div>
  );
}
