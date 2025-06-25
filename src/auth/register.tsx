import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
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
          Iltimos Telefon raqam va Parolingizni kiriting
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
        <Input
          value={name}
          inputMode={'text'}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ height: '44px', fontSize: '16px' }}
          prefix={<UserOutlined style={{ color: '#3c486b70', fontSize: '16px' }} />}
          placeholder='Ism va Familya'
        />
        <Input
          value={phoneNumber}
          inputMode={'numeric'}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ height: '44px', fontSize: '16px' }}
          prefix={<PhoneOutlined style={{ color: '#3c486b70', fontSize: '16px' }} />}
          placeholder='Telefon raqam'
        />
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ height: '44px', fontSize: '16px' }}
          placeholder='Paroll kiriting'
          prefix={<LockOutlined style={{ color: '#3c486b70', fontSize: '16px' }} />}
        />
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ height: '44px', fontSize: '16px' }}
          placeholder='Parollni qayta kiriting'
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
          Ro'yxatdan o'ting
        </Button>
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
        <span style={{ fontSize: '14px', color: '#3c486b70', textAlign: 'right' }}>
          Akkountingiz bormi?{' '}
          <Link to={''} style={{ color: '#ff9556' }}>
            Kirish
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
