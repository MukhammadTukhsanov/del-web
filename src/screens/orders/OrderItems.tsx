import { Typography } from 'antd';
import React from 'react';
import { formatCurrency } from './formatters';
import { OrderItem } from './types';

const { Text } = Typography;

interface OrderItemsProps {
  items: OrderItem[];
  total: number;
}

export const OrderItems: React.FC<OrderItemsProps> = ({ items, total }) => (
  <div style={{ marginBottom: 16 }}>
    <Text strong style={{ marginBottom: 8, display: 'block' }}>
      Maxsulotlar:
    </Text>
    <div
      style={{
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        border: '1px solid #e9ecef',
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: index < items.length - 1 ? '1px solid #e9ecef' : 'none',
          }}
        >
          <div>
            <Text strong>{item.name}</Text>
            <br />
            <Text type='secondary' style={{ fontSize: 12 }}>
              {item.quantity} x {formatCurrency(item.price)}
            </Text>
          </div>
          <Text strong style={{ color: '#ff9556' }}>
            {formatCurrency(item.price * item.quantity)}
          </Text>
        </div>
      ))}
      <div
        style={{
          marginTop: 8,
          paddingTop: 8,
          borderTop: '2px solid #ff9556',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text strong>Jami:</Text>
        <Text strong style={{ fontSize: 16, color: '#ff9556' }}>
          {formatCurrency(total)}
        </Text>
      </div>
    </div>
  </div>
);
