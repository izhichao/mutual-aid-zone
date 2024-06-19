import instance from '../utils/request';

export const getOrders = () => {
  return instance.get('/order');
};

export const finishOrder = (_id: string) => {
  return instance.post('/order/finish', { _id });
};
