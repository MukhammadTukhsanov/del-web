import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  PhoneOutlined,
  ShopOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Rate, Space, Tabs, Tag, Timeline, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Driver {
  name: string;
  phone: string;
  rating: number;
  avatar: string;
}

interface ActiveOrder {
  id: string;
  restaurant: string;
  items: OrderItem[];
  status: 'preparing' | 'on_way' | 'delivered';
  estimatedTime: string;
  total: number;
  address: string;
  driver?: Driver;
}

interface CompletedOrder {
  id: string;
  restaurant: string;
  items: OrderItem[];
  deliveredAt: string;
  total: number;
  rating: number;
  address: string;
}

type TabKey = 'active' | 'completed';

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

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
  };

  const getStatusColor = (status: ActiveOrder['status']): string => {
    switch (status) {
      case 'preparing':
        return '#ff9556';
      case 'on_way':
        return '#52c41a';
      case 'delivered':
        return '#1890ff';
      default:
        return '#d9d9d9';
    }
  };

  const getStatusText = (status: ActiveOrder['status']): string => {
    switch (status) {
      case 'preparing':
        return 'Tayyorlanmoqda';
      case 'on_way':
        return "Yo'lda";
      case 'delivered':
        return 'Yetkazildi';
      default:
        return "Noma'lum";
    }
  };

  const getTimelineItems = (status: ActiveOrder['status']) => {
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

  const ActiveOrderCard: React.FC<{ order: ActiveOrder }> = ({ order }) => (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
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
        <Badge color={getStatusColor(order.status)} text={getStatusText(order.status)} />
      </div>

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
          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: index < order.items.length - 1 ? '1px solid #e9ecef' : 'none',
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
              {formatCurrency(order.total)}
            </Text>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Space>
          <EnvironmentOutlined style={{ color: '#ff9556' }} />
          <Text>{order.address}</Text>
        </Space>
      </div>

      <Timeline items={getTimelineItems(order.status)} style={{ marginBottom: 16 }} />

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

      {order.driver && (
        <Card size='small' style={{ backgroundColor: '#f9f9f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={order.driver.avatar} size={40} style={{ marginRight: 12 }} />
              <div>
                <Text strong>{order.driver.name}</Text>
                <br />
                <Space>
                  <StarOutlined style={{ color: '#faad14' }} />
                  <Text>{order.driver.rating}</Text>
                </Space>
              </div>
            </div>
            <Space>
              <Button type='text' icon={<PhoneOutlined />} style={{ color: '#ff9556' }} />
              <Button type='text' icon={<MessageOutlined />} style={{ color: '#ff9556' }} />
            </Space>
          </div>
        </Card>
      )}
    </Card>
  );

  const CompletedOrderCard: React.FC<{ order: CompletedOrder }> = ({ order }) => (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
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
        <Tag color='green'>Yetkazildi</Tag>
      </div>

      <div style={{ marginBottom: 12 }}>
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
          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: index < order.items.length - 1 ? '1px solid #e9ecef' : 'none',
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
              {formatCurrency(order.total)}
            </Text>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Space>
          <EnvironmentOutlined style={{ color: '#ff9556' }} />
          <Text>{order.address}</Text>
        </Space>
      </div>

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

  return (
    <div
      style={{
        padding: '20px 16px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>
        Mening buyurtmalarim
      </Title>

      <Tabs activeKey={activeTab} onChange={(key: string) => setActiveTab(key as TabKey)} centered>
        <TabPane
          tab={
            <span style={{ color: activeTab === 'active' ? '#ff9556' : undefined }}>
              <ClockCircleOutlined />
              Faol ({activeOrders.length})
            </span>
          }
          key='active'
        >
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => <ActiveOrderCard key={order.id} order={order} />)
          ) : (
            <Card style={{ textAlign: 'center', padding: 40 }}>
              <ShopOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />
              <Title level={4} type='secondary'>
                Faol buyurtmalar yo'q
              </Title>
              <Paragraph type='secondary'>
                Sizning faol buyurtmalaringiz shu yerda ko'rinadi
              </Paragraph>
            </Card>
          )}
        </TabPane>

        <TabPane
          tab={
            <span style={{ color: activeTab === 'completed' ? '#ff9556' : undefined }}>
              <CheckCircleOutlined />
              Bajarilgan ({completedOrders.length})
            </span>
          }
          key='completed'
        >
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => <CompletedOrderCard key={order.id} order={order} />)
          ) : (
            <Card style={{ textAlign: 'center', padding: 40 }}>
              <CheckCircleOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />
              <Title level={4} type='secondary'>
                Bajarilgan buyurtmalar yo'q
              </Title>
              <Paragraph type='secondary'>Sizning buyurtmalar tarixi shu yerda ko'rinadi</Paragraph>
            </Card>
          )}
        </TabPane>
      </Tabs>
      <div style={{ height: '54px' }}></div>
    </div>
  );
};

export default OrdersPage;
