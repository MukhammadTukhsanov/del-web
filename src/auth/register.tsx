import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className='auth-wrapper auth'>
      <img className='auth-logo' src={require('@/assets/icons/auth/logo-auth.png')} alt='yolda' />
      <p className='m-0'>Iltimos Telefon raqam va Parolingizni kiriting</p>
      <Input
        value={name}
        inputMode={'text'}
        onChange={handleChange(setName)}
        prefix={<UserOutlined />}
        placeholder='Ism va Familya'
      />
      <Input
        value={phoneNumber}
        inputMode={'numeric'}
        onChange={handleChange(setPhoneNumber)}
        prefix={<PhoneOutlined />}
        placeholder='Telefon raqam'
      />
      <Input
        type={'password'}
        value={password}
        onChange={handleChange(setPassword)}
        placeholder='Paroll kiriting'
        prefix={<LockOutlined />}
      />
      <Input
        type={'password'}
        value={reEnterPassword}
        onChange={handleChange(setReEnterPassword)}
        placeholder='Parollni qayta kiriting'
        prefix={<LockOutlined />}
      />
      <Button onClick={() => {}} title="Ro'yxatdan o'ting" />
      <span className='auth-footer-text'>
        Akkountingiz bormi?{' '}
        <Link to={''} className='auth-link'>
          Kirish
        </Link>
      </span>
    </div>
  );
}

export default Register;
