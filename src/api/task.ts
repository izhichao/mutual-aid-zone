import instance from '../utils/request';

export const getTasks = () => {
  return instance.get('/task');
};
