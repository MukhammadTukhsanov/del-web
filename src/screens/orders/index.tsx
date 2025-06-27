import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import { ActiveOrderCard } from './ActiveOrderCard';
import { CompletedOrderCard } from './CompletedOrderCard';
import { EmptyState } from './EmptyState';
import { ActiveOrder, CompletedOrder, TabKey } from './types';

const { Title } = Typography;
const { TabPane } = Tabs;

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('active');

  const activeOrders: ActiveOrder[] = [
    {
      id: '#ORD-2024-001',
      restaurant: 'Pizza Palace',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 85000 },
        { name: 'Garlic Bread', quantity: 2, price: 25000 },
        { name: 'Coca Cola', quantity: 1, price: 15000 },
      ],
      status: 'preparing',
      estimatedTime: '25-30 daqiqa',
      total: 125000,
      address: '123 Main St, Apt 4B',
      driver: {
        name: 'John Smith',
        phone: '+1234567890',
        rating: 4.8,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
    },
    {
      id: '#ORD-2024-002',
      restaurant: 'Burger Junction',
      items: [
        { name: 'Classic Burger', quantity: 1, price: 65000 },
        { name: 'French Fries', quantity: 1, price: 30000 },
        { name: 'Vanilla Milkshake', quantity: 1, price: 35000 },
      ],
      status: 'on_way',
      estimatedTime: '10-15 daqiqa',
      total: 130000,
      address: '456 Oak Ave',
      driver: {
        name: 'Sarah Johnson',
        phone: '+1234567891',
        rating: 4.9,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      },
    },
  ];

  const completedOrders: CompletedOrder[] = [
    {
      id: '#ORD-2024-003',
      restaurant: 'Sushi Express',
      items: [
        { name: 'California Roll', quantity: 1, price: 120000 },
        { name: 'Salmon Nigiri', quantity: 8, price: 15000 },
        { name: 'Miso Soup', quantity: 1, price: 25000 },
      ],
      deliveredAt: '2 soat oldin',
      total: 265000,
      rating: 5,
      address: '789 Pine St',
    },
    {
      id: '#ORD-2024-004',
      restaurant: 'Taco Fiesta',
      items: [
        { name: 'Beef Tacos', quantity: 3, price: 35000 },
        { name: 'Guacamole', quantity: 1, price: 20000 },
        { name: 'Churros', quantity: 1, price: 25000 },
      ],
      deliveredAt: '1 kun oldin',
      total: 80000,
      rating: 4,
      address: '321 Elm St',
    },
  ];

  return (
    <div
      style={{
        padding: '20px 16px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24, color: '#3c486b' }}>
        Mening buyurtmalarim
      </Title>

      <Tabs
        color='#ff9556'
        activeKey={activeTab}
        onChange={(key: string) => setActiveTab(key as TabKey)}
        centered
      >
        <TabPane
          tab={
            <span
              style={{
                display: 'flex',
                gap: 8,
                color: activeTab === 'active' ? '#ff9556' : '#3c486b',
              }}
            >
              <ClockCircleOutlined />
              Faol ({activeOrders.length})
            </span>
          }
          key='active'
        >
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => <ActiveOrderCard key={order.id} order={order} />)
          ) : (
            <EmptyState type='active' />
          )}
        </TabPane>

        <TabPane
          tab={
            <span
              style={{
                display: 'flex',
                gap: '8px',
                color: activeTab === 'completed' ? '#ff9556' : '#3c486b',
              }}
            >
              <CheckCircleOutlined />
              Bajarilgan ({completedOrders.length})
            </span>
          }
          key='completed'
        >
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => <CompletedOrderCard key={order.id} order={order} />)
          ) : (
            <EmptyState type='completed' />
          )}
        </TabPane>
      </Tabs>
      <div style={{ height: '54px' }}></div>
    </div>
  );
};

export default OrdersPage;
