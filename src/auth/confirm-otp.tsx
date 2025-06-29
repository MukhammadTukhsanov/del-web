import Button from '@/components/Button/Button';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import PhoneInput from '@/components/PhoneInput/PhoneInput';
import { otpSend, veirifyOtp } from '@/features/auth/otpSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { LeftOutlined } from '@ant-design/icons';
import { Flex, Input as InputOTP } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function ConfirmOTP() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.user.token);
  const loading = useAppSelector((state) => state.otp.loading);
  const phone = useAppSelector((state) => state.otp.phone);
  const otpToken = useAppSelector((state) => state.otp.token);

  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [isAnimating, setIsAnimating] = useState(false);

  const countdownRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [countdown]);

  // Auto focus OTP input
  useEffect(() => {
    const otpInput = document.querySelector('.ant-otp input');
    if (otpInput) {
      setTimeout(() => {
        (otpInput as HTMLInputElement).focus();
      }, 500);
    }
  }, []);

  const onChange = (text: string) => {
    setOtpValue(text);
    if (otpError) {
      setOtpError(false);
    }

    // Auto submit when OTP is complete
    if (text.length === 6) {
      handleVerifyOtp(text);
    }
  };

  const onInput = (value: string[]) => {
    console.log('onInput:', value.join(''));
  };

  const handleVerifyOtp = async (otp?: string) => {
    const otpToVerify = otp || otpValue;

    if (!otpToVerify || otpToVerify.length !== 6) {
      setOtpError(true);
      console.log('otpError');
      return;
    }

    setIsLoading(true);
    setIsAnimating(true);

    try {
      await dispatch(veirifyOtp({ phone: phone || '', otp: otpToVerify })).unwrap();
    } catch (error) {
      setOtpError(true);
      setIsLoading(false);
      setIsAnimating(false);
      setCountdown(0);
      setOtpValue('');
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);
    setCountdown(60);
    setOtpError(false);
    setOtpValue('');

    console.log('Resending OTP...');
    try {
      await dispatch(otpSend({ phone: phone! }));
    } catch (error) {
      setCountdown(0);
      setResendDisabled(false);
      setOtpError(true);
      setOtpValue('');
    }
  };

  const handleBackToLogin = () => {
    const wrapper = document.querySelector('.auth-wrapper');
    if (wrapper) {
      wrapper.classList.add('page-exit');
    }

    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  const sharedProps = {
    onChange,
    onInput,
    value: otpValue,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!phone) {
    return <Navigate to='/login' replace />;
  }

  if (userToken || otpToken) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='auth-wrapper auth'>
      <img className='auth-logo' src={require('@/assets/icons/auth/logo-auth.png')} alt='yolda' />

      <p className='m-0'>
        Parolingizni unutdingizmi? Ro'yxatdan o'tilgan telefon raqamni kiriting.
      </p>

      <div className='auth-input-wrapper'>
        <PhoneInput value={phone || ''} disabled={true} placeholder='Telefon raqam' size='large' />
      </div>

      <div className='otp-wrapper'>
        <Flex gap='middle' align='center' vertical>
          <InputOTP.OTP
            size={'large'}
            formatter={(str: any) => str.toUpperCase()}
            className={otpError ? 'input-error' : ''}
            disabled={isLoading}
            {...sharedProps}
          />
          {otpError && (
            <span
              style={{
                color: '#ef4444',
                fontSize: '12px',
                animation: 'fadeInUp 0.3s ease-out',
              }}
            >
              Noto'g'ri SMS kod kiritildi
            </span>
          )}
        </Flex>
      </div>

      <span className='auth-footer-text'>
        SMS kod kelmadi!{' '}
        {resendDisabled ? (
          <span style={{ color: '#9ca3af' }}>Qayta jo'natish ({countdown}s)</span>
        ) : (
          <Link
            to=''
            className='auth-link'
            onClick={(e) => {
              e.preventDefault();
              handleResendOtp();
            }}
          >
            Qayta jo'natish
          </Link>
        )}
      </span>

      <Button
        onClick={() => handleVerifyOtp()}
        title={isLoading ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
        className={`auth-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading || !otpValue || otpValue.length !== 6}
      />

      <button onClick={handleBackToLogin} className='auth-back-button'>
        <LeftOutlined />
      </button>
    </div>
  );
}

export default ConfirmOTP;
