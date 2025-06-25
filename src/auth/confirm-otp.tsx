import { PhoneOutlined } from '@ant-design/icons';
import { Button, Flex, GetProps, Input, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

type OTPProps = GetProps<typeof Input.OTP>;

function ConfirmOTP() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const onInput: OTPProps['onInput'] = (value) => {
    console.log('onInput:', value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };
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
          Parolingizni unutdingizmi? Ro'yxatdan o'tilgan telefon raqamni kiriting.
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
          value={phoneNumber}
          inputMode={'numeric'}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ height: '44px', fontSize: '16px' }}
          prefix={<PhoneOutlined style={{ color: '#3c486b70', fontSize: '16px' }} />}
          placeholder='Telefon raqam'
        />
        <Flex gap='middle' align='flex-start' vertical>
          <Input.OTP size={'large'} formatter={(str) => str.toUpperCase()} {...sharedProps} />
        </Flex>
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
            Sms kod kelmadi!{' '}
            <Link to={''} style={{ color: '#ff9556' }}>
              Qayta jo'natish
            </Link>
          </span>
        </div>
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
          SMS Jo'natish
        </Button>
      </div>
    </div>
  );
}

export default ConfirmOTP;
