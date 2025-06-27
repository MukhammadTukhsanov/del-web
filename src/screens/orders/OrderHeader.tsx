import { Badge, Tag, Typography } from 'antd';
import React from 'react';
import { getStatusColor, getStatusText } from './formatters';
import { ActiveOrder, CompletedOrder } from './types';

const { Text } = Typography;

interface OrderHeaderProps {
  order: ActiveOrder | CompletedOrder;
  type: 'active' | 'completed';
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order, type }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    }}
  >
    <div>
      <Text strong style={{ fontSize: 16 }}>
        {order.restaurant}
      </Text>
      <br />
      <Text type='secondary'>{order.id}</Text>
    </div>
    {type === 'active' ? (
      <Badge
        color={getStatusColor((order as ActiveOrder).status)}
        text={getStatusText((order as ActiveOrder).status)}
      />
    ) : (
      <Tag color='green'>Yetkazildi</Tag>
    )}
  </div>
);
