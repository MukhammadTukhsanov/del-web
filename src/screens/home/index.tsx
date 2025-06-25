import BottomSheet from '@/components/BottomSheet';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import HomeBody from './components/body';
import LocationModal from './components/location-modal';
import './style.css';

const { Search } = Input;

export default function Home() {
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("O'zbekiston ko'chasi 141");

  const navigate = useNavigate();

  const handleSearch = (value: any) => {
    console.log('Searching for:', value);
  };

  const handleLocationClick = () => {
    setLocationModalOpen(true);
  };

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    setLocationModalOpen(false);
  };

  const closeLocationModal = () => {
    setLocationModalOpen(false);
  };

  return (
    <div style={{ height: '100%' }}>
      <div className={'wrapper'}>
        <div
          className={'header-container'}
          style={{
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div className={'header clipped-header'}>
            <img
              style={{ width: 36, height: 36 }}
              src={require('@/assets/icons/logo.svg')}
              alt='Yo`lda'
            />
            <div className='location' onClick={handleLocationClick} style={{ cursor: 'pointer' }}>
              <small>Joylashuv</small>
              <div className='location-address'>
                <i className='bi bi-geo-alt-fill'></i>
                <h6 className='m-0'>{currentLocation}</h6>
                <DownOutlined />
              </div>
            </div>
            <Button
              shape='circle'
              icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />}
              size='large'
              onClick={() => navigate('/basket')}
            />
          </div>
        </div>

        <div
          className={'searchbar'}
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Search
            placeholder='Ovqat, restoran, do`kon ...'
            prefix={<i className='bi bi-search' style={{ color: '#666666', marginRight: 8 }} />}
            allowClear
            size='large'
            onSearch={handleSearch}
            className='search-input'
            style={{
              width: '100%',
              borderRadius: '20px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
          />
        </div>
        <HomeBody />
      </div>

      <BottomSheet
        isOpen={isLocationModalOpen}
        onClose={closeLocationModal}
        title='Joylashuvni tanlang'
        height='70vh'
      >
        <LocationModal onSelectLocation={handleLocationSelect} />
      </BottomSheet>
    </div>
  );
}
