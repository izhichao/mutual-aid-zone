import instance from '../utils/request';

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 * @returns
 */
export const login = (username: string, password: string) => {
  return instance.post('/api/user/login', {
    username,
    password
  });
};

/**
 * 注册
 * @param username 用户名
 * @param phone 手机号
 * @param email 邮箱
 * @param password 密码
 * @returns
 */
export const register = (username: string, phone: string, email: string, password: string) => {
  return instance.post('/api/user/register', {
    username,
    phone,
    email,
    password
  });
};

/**
 * 获取邮箱验证码
 * @param email
 * @returns
 */
export const getCode = (email: string) => {
  return instance.post('/api/user/code', { email });
};

/** 获取用户详情 */
export const getUser = () => {
  return instance.get('/api/user/detail');
};

/**
 * 修改密码
 * @param oldPassword 旧密码
 * @param password 新密码
 * @returns
 */
export const changePassword = (oldPassword: string, password: string) => {
  return instance.post('/api/user/password', {
    oldPassword,
    password
  });
};

/**
 * 忘记密码
 * @param email 邮箱
 * @returns
 */
export const forgetPassword = (email: string) => {
  return instance.post('/api/user/forget', {
    email
  });
};

/**
 * 修改用户信息
 * @param formData 用户信息
 * @returns
 */
export const editUser = (formData: FormData) => {
  return instance.post('/api/user/edit', formData);
};
