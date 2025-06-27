import LocationSelectorMap from '@/components/LocationSelectorMap';
import { useAppSelector } from '@/hooks';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button, Input, List, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface LocationModalProps {
  onSelectLocation: (location: string) => void;
}

interface Location {
  title?: string;
  lat?: number;
  lng?: number;
}

const LocationModal: React.FC<LocationModalProps> = ({ onSelectLocation }) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const location = user?.location;
  const locations: Location[] = user.locations || [];

  const handleLocationSelect = (location: any) => {
    onSelectLocation(location.name);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'current':
        return <EnvironmentOutlined style={{ color: '#ff9556', fontSize: '16px' }} />;
      case 'recent':
        return <ClockCircleOutlined style={{ color: '#8c8c8c', fontSize: '16px' }} />;
      default:
        return <i className='bi bi-geo-alt' style={{ color: '#8c8c8c', fontSize: '16px' }} />;
    }
  };

  return (
    <div className='location-modal' style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '24px', flexShrink: 0 }}>
          <Text strong style={{ fontSize: '16px', marginBottom: '12px', display: 'block' }}>
            Tanlangan manzil
          </Text>
          <div
            style={{
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleLocationSelect(location)}
          >
            {getLocationIcon('current')}
            <Text style={{ marginLeft: '8px', fontSize: '14px' }}>
              {location?.title || 'Manzil tanlanmagan'}
            </Text>
            <span style={{ marginLeft: 'auto', color: '#8c8c8c', fontSize: '12px' }}>
              {location?.lat && location.lng ? `${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}` : 'Manzil ma\'lum emas'}
            </span>
          </div>
        </div>
        {locations.length > 0 && (
          <div style={{ marginBottom: '24px', flexShrink: 0 }}>
            <Text strong style={{ fontSize: '16px', marginBottom: '12px', display: 'block' }}>
              So'nggi manzillar
            </Text>
            <List
              dataSource={locations}
              renderItem={(item) => (
                <List.Item
                  style={{
                    padding: '12px 0',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => handleLocationSelect(item)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <List.Item.Meta
                    avatar={getLocationIcon('recent')}
                    title={
                      <Text strong style={{ fontSize: '14px' }}>
                        {item?.title}
                      </Text>
                    }
                    description={
                      <Text type='secondary' style={{ fontSize: '12px' }}>
                        {item?.lat && item.lng ? `${item.lat.toFixed(2)}, ${item.lng.toFixed(2)}` : 'Manzil ma\'lum emas'}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
      <div style={{ marginBottom: '24px', flexShrink: 0 }}>
        <Button
          type='primary'
          icon={<i className='bi bi-crosshair' style={{ marginRight: '8px', color: '#ff9556' }} />}
          size='large'
          block
          style={{
            backgroundColor: '#ff9556',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
          onClick={() => {
            // Handle current location detection
            // console.log('Getting current location...');
            navigate('/location');
          }}
        >
          Joriy joylashuvni aniqlash
        </Button>
      </div>
    </div>
  );
};

export default LocationModal;
