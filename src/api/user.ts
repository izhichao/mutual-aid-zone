import instance from '../utils/request';

export const login = (username: string, password: string) => {
  return instance.post('/user/login', {
    username,
    password
  });
};

export const register = (username: string, phone: string, email: string, password: string) => {
  return instance.post('/user/register', {
    username,
    phone,
    email,
    password
  });
};
