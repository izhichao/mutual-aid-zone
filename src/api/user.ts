import instance from '../utils/request';

export const login = (username: string, password: string) => {
  return instance.post('/api/user/login', {
    username,
    password
  });
};

export const register = (username: string, phone: string, email: string, password: string) => {
  return instance.post('/api/user/register', {
    username,
    phone,
    email,
    password
  });
};
