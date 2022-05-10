import instance from '../utils/request';

export const getBalance = () => {
  return instance.get('/api/store/balance');
};

export const getGoods = () => {
  return instance.get('/api/store');
};

export const recharge = (num: number) => {
  return instance.post('/api/store/charge', { num });
};
