import instance from '../utils/request';

export const getTasks = () => {
  return instance.get('/api/task');
};

export const getDetail = (_id: string) => {
  return instance.get('/api/task/detail', {
    params: { _id }
  });
};
