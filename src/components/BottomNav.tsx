import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './BottomNav.css'; // optional for styling

export default function BottomNav() {
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  return (
    <nav className='bottom-nav'>
      <NavLink to='/' end className='nav-link'>
        <i className='bi bi-house-fill nav-link-icon'></i>
        Bosh saxifa
      </NavLink>
      <NavLink to='/cart' end className='nav-link'>
        <div className='cart-icon-container'>
          <i className='bi bi-cart nav-link-icon'></i>
          {totalItems > 0 && (
            <span className='cart-badge'>{totalItems > 99 ? '99+' : totalItems}</span>
          )}
        </div>
        Savat
      </NavLink>
      <NavLink to='/orders' end className='nav-link'>
        <i className='bi bi-receipt nav-link-icon'></i>
        Buyurtmalar
      </NavLink>
      <NavLink to='/profile' className='nav-link'>
        <i className='bi bi-person-fill nav-link-icon'></i>
        Profile
      </NavLink>
    </nav>
  );
}
