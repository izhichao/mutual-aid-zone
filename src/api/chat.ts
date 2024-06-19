import instance from '../utils/request';

export const getUserChats = () => {
  return instance.get('/chat/user');
};

export const getPastChats = (_id: string) => {
  return instance.get('/chat/past', { params: { _id } });
};
