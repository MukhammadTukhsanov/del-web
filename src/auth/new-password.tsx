import { LockOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useState } from 'react';

function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img
          style={{ width: '170px' }}
          src={require('@/assets/icons/auth/logo-auth.png')}
          alt='yolda'
        />
      </div>
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <p className='m-0' style={{ width: '70%', textAlign: 'center', color: '#3C486B70' }}>
          Yangi parol kiriting!
        </p>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 24px',
          gap: '25px',
        }}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ height: '44px', fontSize: '16px' }}
          placeholder='Paroll kiriting'
          prefix={<LockOutlined style={{ color: '#3c486b70', fontSize: '16px' }} />}
        />
        <Input.Password
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ height: '44px', fontSize: '16px' }}
          placeholder='Parollni tasdiqlang'
          prefix={<LockOutlined style={{ color: '#3c486b70', fontSize: '16px' }} />}
        />
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <Button
          style={{
            backgroundColor: '#ff9556',
            height: '44px',
            paddingRight: '36px',
            paddingLeft: '36px',
            fontSize: '16px',
          }}
          type='primary'
        >
          Tasdiqlash
        </Button>
      </div>
    </div>
  );
}

export default NewPassword;
