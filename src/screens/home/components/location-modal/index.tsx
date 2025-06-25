import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button, Input, List, Typography } from 'antd';
import React, { useState } from 'react';

const { Search } = Input;
const { Text } = Typography;

interface LocationModalProps {
  onSelectLocation: (location: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ onSelectLocation }) => {
  const [searchValue, setSearchValue] = useState('');

  // Mock data for recent and popular locations
  const recentLocations = [
    {
      id: 1,
      name: "O'zbekiston ko'chasi 141",
      description: 'Sizning joriy manzilingiz',
      type: 'current',
    },
    {
      id: 2,
      name: "Amir Temur ko'chasi 23",
      description: 'Oldingi buyurtma manzili',
      type: 'recent',
    },
    {
      id: 3,
      name: 'Mustaqillik maydoni',
      description: 'Ish joyi',
      type: 'recent',
    },
  ];

  const popularLocations = [
    {
      id: 4,
      name: 'Toshkent Sitisi',
      description: 'Savdo markazi',
      type: 'popular',
    },
    {
      id: 5,
      name: 'Magic City Park',
      description: "Ko'ngilochar markaz",
      type: 'popular',
    },
    {
      id: 6,
      name: 'Next Mall',
      description: 'Savdo markazi',
      type: 'popular',
    },
    {
      id: 7,
      name: 'Chorsu bozori',
      description: "An'anaviy bozor",
      type: 'popular',
    },
  ];

  const handleSearch = (value: string) => {
    setSearchValue(value);
    console.log('Searching for location:', value);
  };

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
        {recentLocations.length > 0 && (
          <div style={{ marginBottom: '24px', flexShrink: 0 }}>
            <Text strong style={{ fontSize: '16px', marginBottom: '12px', display: 'block' }}>
              So'nggi manzillar
            </Text>
            <List
              dataSource={recentLocations}
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
                    avatar={getLocationIcon(item.type)}
                    title={
                      <Text strong style={{ fontSize: '14px' }}>
                        {item.name}
                      </Text>
                    }
                    description={
                      <Text type='secondary' style={{ fontSize: '12px' }}>
                        {item.description}
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
            console.log('Getting current location...');
          }}
        >
          Joriy joylashuvni aniqlash
        </Button>
      </div>
    </div>
  );
};

export default LocationModal;
