export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Driver {
  name: string;
  phone: string;
  rating: number;
  avatar: string;
}

export interface ActiveOrder {
  id: string;
  restaurant: string;
  items: OrderItem[];
  status: 'preparing' | 'on_way' | 'delivered';
  estimatedTime: string;
  total: number;
  address: string;
  driver?: Driver;
}

export interface CompletedOrder {
  id: string;
  restaurant: string;
  items: OrderItem[];
  deliveredAt: string;
  total: number;
  rating: number;
  address: string;
}

export type TabKey = 'active' | 'completed';
