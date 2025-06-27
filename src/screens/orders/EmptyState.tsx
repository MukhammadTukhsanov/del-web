import { CheckCircleOutlined, ShopOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface EmptyStateProps {
  type: 'active' | 'completed';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const config = {
    active: {
      icon: <ShopOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />,
      title: "Faol buyurtmalar yo'q",
      description: "Sizning faol buyurtmalaringiz shu yerda ko'rinadi",
    },
    completed: {
      icon: <CheckCircleOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />,
      title: "Bajarilgan buyurtmalar yo'q",
      description: "Sizning buyurtmalar tarixi shu yerda ko'rinadi",
    },
  };

  return (
    <Card style={{ textAlign: 'center', padding: 40 }}>
      {config[type].icon}
      <Title level={4} type='secondary'>
        {config[type].title}
      </Title>
      <Paragraph type='secondary'>{config[type].description}</Paragraph>
    </Card>
  );
};
