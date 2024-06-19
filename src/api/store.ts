import instance from '../utils/request';

/** 获取余额 */
export const getBalance = () => {
  return instance.get('/store/balance');
};

/** 获取商品列表 */
export const getGoods = () => {
  return instance.get('/store');
};

/**
 * 余额充值
 * @param amount 充值金额
 * @returns
 */
export const recharge = (amount: number) => {
  return instance.post('/store/recharge', { amount });
};

/**
 * 兑换商品
 * @param _id 商品ID
 * @returns
 */
export const exchange = (_id: string) => {
  return instance.post('/store/exchange', { _id });
};