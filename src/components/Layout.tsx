// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div style={{ height: '100vh' }}>
      {' '}
      <Outlet />
      <BottomNav />
    </div>
  );
}
