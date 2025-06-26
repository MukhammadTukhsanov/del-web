import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { veirifyOtp } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { PhoneOutlined } from '@ant-design/icons';
import { Flex, GetProps, Input as InputOTP } from 'antd';
import { Link } from 'react-router-dom';

type OTPProps = GetProps<typeof InputOTP.OTP>;

function ConfirmOTP() {
  const dispatch = useAppDispatch();
  const phone = useAppSelector((state) => state.auth.phone);
  const token = useAppSelector((state) => state.auth.token);

  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const onInput: OTPProps['onInput'] = (value) => {
    console.log('onInput:', value);
  };

  if(token) {
    alert('Siz allaqachon tizimga kirdingiz');
  }

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
        value={phone || ''}
        onChange={(e) => console.log('Phone input changed:', e.target.value)}
        inputMode={'numeric'}
        prefix={<PhoneOutlined />}
        placeholder='Telefon raqam'
        disabled
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
      <Button onClick={() => {
        dispatch(veirifyOtp({ phone: phone || '', otp: '123456' }));
        
      }} title="SMS Jo'natish" />
    </div>
  );
}

export default ConfirmOTP;
