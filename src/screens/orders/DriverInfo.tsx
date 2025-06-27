import { MessageOutlined, PhoneOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Space, Typography } from 'antd';
import React from 'react';
import { Driver } from './types';

const { Text } = Typography;

interface DriverInfoProps {
  driver: Driver;
}

export const DriverInfo: React.FC<DriverInfoProps> = ({ driver }) => (
  <Card size='small' style={{ backgroundColor: '#f9f9f9' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={driver.avatar} size={40} style={{ marginRight: 12 }} />
        <div>
          <Text strong>{driver.name}</Text>
          <br />
          <Space>
            <StarOutlined style={{ color: '#faad14' }} />
            <Text>{driver.rating}</Text>
          </Space>
        </div>
      </div>
      <Space>
        <Button type='text' icon={<PhoneOutlined />} style={{ color: '#ff9556' }} />
        <Button type='text' icon={<MessageOutlined />} style={{ color: '#ff9556' }} />
      </Space>
    </div>
  </Card>
);
