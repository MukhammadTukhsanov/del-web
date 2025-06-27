import { EnvironmentOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface OrderAddressProps {
  address: string;
}

export const OrderAddress: React.FC<OrderAddressProps> = ({ address }) => (
  <div style={{ marginBottom: 16 }}>
    <Space>
      <EnvironmentOutlined style={{ color: '#ff9556' }} />
      <Text>{address}</Text>
    </Space>
  </div>
);
