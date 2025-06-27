import { Card, Typography } from 'antd';
import React from 'react';
import { DriverInfo } from './DriverInfo';
import { formatCurrency } from './formatters';
import { OrderAddress } from './OrderAddress';
import { OrderHeader } from './OrderHeader';
import { OrderItems } from './OrderItems';
import { OrderTimeline } from './OrderTimeline';
import { ActiveOrder } from './types';

const { Text } = Typography;

interface ActiveOrderCardProps {
  order: ActiveOrder;
}

export const ActiveOrderCard: React.FC<ActiveOrderCardProps> = ({ order }) => (
  <Card
    style={{
      marginBottom: 16,
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}
  >
    <OrderHeader order={order} type='active' />
    <OrderItems items={order.items} total={order.total} />
    <OrderAddress address={order.address} />
    <OrderTimeline status={order.status} />

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <div>
        <Text strong style={{ fontSize: 18, color: '#ff9556' }}>
          {formatCurrency(order.total)}
        </Text>
        <br />
        <Text type='secondary'>Taxminiy vaqt: {order.estimatedTime}</Text>
      </div>
    </div>

    {order.driver && <DriverInfo driver={order.driver} />}
  </Card>
);
