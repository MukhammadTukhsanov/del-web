import Button from '@/components/Button/Button';
import PhoneInput from '@/components/PhoneInput/PhoneInput'; // Updated import
import { otpSend } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

function Login() {
  const dispatch = useAppDispatch();
  const statePhone = useAppSelector((state) => state.auth.phone);
  const [phone, setPhone] = useState('');
  const [cleanPhone, setCleanPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();

  const handlePhoneChange = (formattedPhone: string, cleanPhoneNumber: string) => {
    setPhone(formattedPhone);
    setCleanPhone(cleanPhoneNumber);
    if (inputError) {
      setInputError(false);
    }
  };

  const handlePhoneValidation = (cleanPhoneNumber: string, isValid: boolean) => {
    setIsPhoneValid(isValid);
  };

  const handleLogin = async () => {
    if (!cleanPhone || !isPhoneValid) {
      setInputError(true);
      return;
    }

    setIsLoading(true);
    setIsAnimating(true);

    try {
      await dispatch(otpSend({ phone: cleanPhone }));

      const wrapper = document.querySelector('.auth-wrapper');
      if (wrapper) {
        wrapper.classList.add('page-exit');
      }

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    } catch (error) {
      setInputError(true);
      setIsLoading(false);
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    if (statePhone && !isAnimating) {
      navigate('/confirmOTP');
    }
  }, [statePhone, navigate, isAnimating]);

  return (
    <div className='auth-wrapper auth'>
      <img className='auth-logo' src={require('@/assets/icons/auth/logo-auth.png')} alt='yolda' />

      <p className='m-0'>Iltimos Telefon raqam va Parolingizni kiriting</p>

      <div className='auth-input-wrapper'>
        <PhoneInput
          value={phone}
          onChange={handlePhoneChange}
          onValidChange={handlePhoneValidation}
          placeholder='Telefon raqam'
          error={inputError}
          disabled={isLoading}
          autoFocus={true}
          size='large'
        />
      </div>

      <Button
        onClick={handleLogin}
        title={isLoading ? 'Yuborilmoqda...' : 'Kirish'}
        className={`auth-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      />
    </div>
  );
}

export default Login;
