import { Space } from 'antd';
import HorixontalMenuItem from './horizontal-menu-item';
import './style.css';

export default function HorizontalMenu() {
  return (
    <div className='py-16'>
      <div className='px-16 d-flex j-between a-center mb-16'>
        <h4 className='horizontal-menu-title m-0'>Bepul yetkazib berish</h4>
        <small className='horizontal-menu-subtitle'>Hammasini ko'rsatish</small>
      </div>
      <div className={'body-header-menu-wrapper'}>
        <Space direction='horizontal' size={'large'}>
          <HorixontalMenuItem />
          <HorixontalMenuItem />
          <HorixontalMenuItem />
          <HorixontalMenuItem />
        </Space>
      </div>
    </div>
  );
}
