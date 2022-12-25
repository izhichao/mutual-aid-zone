import instance from '../utils/request';

export const getOrders = () => {
  return instance.get('/api/order');
};
