import { ActiveOrder } from './types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
};

export const getStatusColor = (status: ActiveOrder['status']): string => {
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

export const getStatusText = (status: ActiveOrder['status']): string => {
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
