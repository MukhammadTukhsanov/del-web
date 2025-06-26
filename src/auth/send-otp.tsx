import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SendOTP() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className='auth-wrapper auth'>
      <img className='auth-logo' src={require('@/assets/icons/auth/logo-auth.png')} alt='yolda' />
      <p className='m-0'>
        Parolingizni unutdingizmi? Ro'yxatdan o'tilgan telefon raqamni kiriting.
      </p>

      <Input
        value={phoneNumber}
        inputMode={'numeric'}
        onChange={handleChange(setPhoneNumber)}
        prefix={<PhoneOutlined />}
        placeholder='Telefon raqam'
      />

      <Button onClick={() => {}} title="SMS Jo'natish" />
      <span className='auth-footer-text'>
        Parollni unuttingizmi?{' '}
        <Link to={''} className='auth-link'>
          Ro'yxatdan o'tish
        </Link>
      </span>
    </div>
  );
}

export default SendOTP;
