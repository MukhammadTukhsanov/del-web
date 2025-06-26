import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { PhoneOutlined } from '@ant-design/icons';
import { Flex, GetProps, Input as InputOTP } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type OTPProps = GetProps<typeof InputOTP.OTP>;

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
    <div className='auth-wrapper auth'>
      <img className='auth-logo' src={require('@/assets/icons/auth/logo-auth.png')} alt='yolda' />

      <p className='m-0'>
        Parolingizni unutdingizmi? Ro'yxatdan o'tilgan telefon raqamni kiriting.
      </p>
      <Input
        value={phoneNumber}
        inputMode={'numeric'}
        onChange={(e) => setPhoneNumber(e.target.value)}
        prefix={<PhoneOutlined />}
        placeholder='Telefon raqam'
      />
      <Flex gap='middle' align='flex-start' vertical>
        <InputOTP.OTP size={'large'} formatter={(str: any) => str.toUpperCase()} {...sharedProps} />
      </Flex>
      <span className='auth-footer-text'>
        Sms kod kelmadi!{' '}
        <Link to={''} className={'auth-link'}>
          Qayta jo'natish
        </Link>
      </span>
      <Button onClick={() => {}} title="SMS Jo'natish" />
    </div>
  );
}

export default ConfirmOTP;
