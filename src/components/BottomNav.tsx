import { NavLink } from 'react-router-dom';
import './BottomNav.css'; // optional for styling

export default function BottomNav() {
  return (
    <nav className='bottom-nav'>
      <NavLink to='/' end className='nav-link'>
        <i className='bi bi-house-fill nav-link-icon'></i>
        Bosh saxifa
      </NavLink>
      <NavLink to='/basket' end className='nav-link'>
        <i className='bi bi-basket nav-link-icon'></i>
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
