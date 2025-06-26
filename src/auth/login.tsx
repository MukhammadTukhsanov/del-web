import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { login } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

function Login() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const handleLogin = () => dispatch(login({ email, password }));

  return (
    <div className='auth-wrapper auth'>
      {/* <h2>{token}</h2> */}
      <img className='auth-logo' src={require('@/assets/icons/auth/logo-auth.png')} alt='yolda' />
      <p className='m-0'>Iltimos Telefon raqam va Parolingizni kiriting</p>

      <Input
        value={email}
        onChange={handleChange(setEmail)}
        prefix={<PhoneOutlined />}
        placeholder='Telefon raqam'
      />
      <div className='auth-password-wrapper'>
        <Input
          value={password}
          type={'password'}
          onChange={handleChange(setPassword)}
          placeholder='Paroll kiriting'
          prefix={<LockOutlined />}
        />
        <Link className='forgot-text' to={''}>
          Parollni unuttingizmi?
        </Link>
      </div>
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
