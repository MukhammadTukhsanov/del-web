import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { LockOutlined } from '@ant-design/icons';
import { useState } from 'react';

function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className='auth-wrapper auth'>
      <img className='auth-logo' src={require('@/assets/icons/auth/logo-auth.png')} alt='yolda' />
      <p className='m-0'>Yangi parol kiriting!</p>
      <Input
        type={'password'}
        value={password}
        onChange={handleChange(setPassword)}
        placeholder='Paroll kiriting'
        prefix={<LockOutlined />}
      />
      <Input
        type={'password'}
        value={confirmPassword}
        onChange={handleChange(setConfirmPassword)}
        placeholder='Parollni tasdiqlang'
        prefix={<LockOutlined />}
      />

      <Button onClick={() => {}} title='Tasdiqlash' />
    </div>
  );
}

export default NewPassword;
