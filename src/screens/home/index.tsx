import BottomSheet from '@/components/BottomSheet';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';

import { getMerchants } from '@/features/merchants';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import HomeBody from './components/body';
import LocationModal from './components/location-modal';
import './style.css';

const { Search } = Input;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(user?.location);

  useEffect(() => {
    dispatch(getMerchants());
  }, [dispatch]);

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
          <div className={'header clipped-header'} style={{ backgroundColor: 'transparent' }}>
            <img
              style={{ width: 36, height: 36 }}
              src={require('@/assets/icons/logo.svg')}
              alt='Yo`lda'
            />
            <div className='location' onClick={handleLocationClick} style={{ cursor: 'pointer' }}>
              <small>Yetkazib berish manzilingiz</small>
              <div className='location-address'>
                <i className='bi bi-geo-alt-fill'></i>
                <h6 className='m-0'>
                  {currentLocation ? currentLocation?.addressName : 'Manzilni tanlang'}
                </h6>
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
