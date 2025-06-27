import { Image } from 'antd';
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className='spinner'>
      <Image src={require('@/assets/icons/logo-loading-page.svg')} />
      <span className='loader'></span>
    </div>
  );
};

export default LoadingSpinner;
