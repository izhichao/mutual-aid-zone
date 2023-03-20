import instance from '../utils/request';

export const getUserChats = () => {
  return instance.get('/api/chat/user');
};