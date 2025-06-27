import { CarOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import React from 'react';
import { ActiveOrder } from './types';

interface OrderTimelineProps {
  status: ActiveOrder['status'];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ status }) => {
  const getTimelineItems = () => {
    const items = [
      {
        dot: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        children: 'Buyurtma tasdiqlandi',
      },
      {
        dot:
          status === 'preparing' ? (
            <ClockCircleOutlined style={{ color: '#ff9556' }} />
          ) : (
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
          ),
        children: 'Restoran tayyorlayapti',
      },
      {
        dot:
          status === 'on_way' ? (
            <CarOutlined style={{ color: '#ff9556' }} />
          ) : status === 'delivered' ? (
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
          ) : (
            <ClockCircleOutlined style={{ color: '#d9d9d9' }} />
          ),
        children: "Yetkazish uchun yo'lda",
      },
      {
        dot:
          status === 'delivered' ? (
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
          ) : (
            <ClockCircleOutlined style={{ color: '#d9d9d9' }} />
          ),
        children: 'Yetkazildi',
      },
    ];
    return items;
  };

  return <Timeline items={getTimelineItems()} style={{ marginBottom: 16 }} />;
};
