import { Button, Card, Rate, Space, Typography } from 'antd';
import React from 'react';
import { formatCurrency } from './formatters';
import { OrderAddress } from './OrderAddress';
import { OrderHeader } from './OrderHeader';
import { OrderItems } from './OrderItems';
import { CompletedOrder } from './types';

const { Text } = Typography;

interface CompletedOrderCardProps {
  order: CompletedOrder;
}

export const CompletedOrderCard: React.FC<CompletedOrderCardProps> = ({ order }) => (
  <Card
    style={{
      marginBottom: 16,
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}
  >
    <OrderHeader order={order} type='completed' />
    <OrderItems items={order.items} total={order.total} />
    <OrderAddress address={order.address} />

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <div>
        <Text strong style={{ fontSize: 18, color: '#ff9556' }}>
          {formatCurrency(order.total)}
        </Text>
        <br />
        <Text type='secondary'>Yetkazildi: {order.deliveredAt}</Text>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Rate disabled defaultValue={order.rating} style={{ fontSize: 14 }} />
        <br />
        <Text type='secondary'>Sizning bahoyingiz</Text>
      </div>
    </div>

    <Space style={{ width: '100%', justifyContent: 'center' }}>
      <Button type='default'>Qayta buyurtma</Button>
      <Button type='default'>Baholash va sharh</Button>
    </Space>
  </Card>
);
