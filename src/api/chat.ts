import instance from '../utils/request';

export const getUserChats = () => {
  return instance.get('/api/chat/user');
};

export const getPastChats = (_id: string) => {
  return instance.get('/api/chat/past', { params: { _id } });
};
