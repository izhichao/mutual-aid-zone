import instance from '../utils/request';

export const getOrders = () => {
  return instance.get('/api/order');
};

export const finishOrder = (_id: string) => {
  return instance.post('/api/order/finish', { _id });
};
