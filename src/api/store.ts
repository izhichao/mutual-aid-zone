import instance from '../utils/request';

export const getBalance = () => {
  return instance.get('/api/balance');
};
