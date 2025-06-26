import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { otpSend } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './auth.css';

function Login() {
  const dispatch = useAppDispatch();
  const statePhone = useAppSelector((state) => state.auth.phone);
  const [phone, setPhone] = useState('');

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const handleLogin = () => dispatch(otpSend({ phone }));

  if(statePhone) {
    return <Navigate to='/confirmOTP' replace={true} />;
  }

  return (
    <div className='auth-wrapper auth'>
      <img className='auth-logo' src={require('@/assets/icons/auth/logo-auth.png')} alt='yolda' />
      <p className='m-0'>Iltimos Telefon raqam va Parolingizni kiriting</p>

      <Input
        value={phone}
        onChange={handleChange(setPhone)}
        prefix={<PhoneOutlined />}
        placeholder='Telefon raqam'
      />
      <Button onClick={handleLogin} title='Kirish' />
      <span className='auth-footer-text'>
        Parollni unuttingizmi?{' '}
        <Link className='auth-link' to={''}>
          Ro'yxatdan o'tish
        </Link>
      </span>
    </div>
  );
}

export default Login;
