import instance from '../utils/request';

/** 获取余额 */
export const getBalance = () => {
  return instance.get('/api/store/balance');
};

/** 获取商品列表 */
export const getGoods = () => {
  return instance.get('/api/store');
};

/**
 * 余额充值
 * @param num 充值金额
 * @returns
 */
export const recharge = (num: number) => {
  return instance.post('/api/store/charge', { num });
};

/**
 * 兑换商品
 * @param _id 商品ID
 * @returns
 */
export const exchange = (_id: string) => {
  return instance.post('/api/store/exchange', { _id });
};