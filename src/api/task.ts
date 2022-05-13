import instance from '../utils/request';

/** 获取所有任务 */
export const getTasks = () => {
  return instance.get('/api/task');
};

/** 获取我发布的 */
export const getPublishTasks = () => {
  return instance.get('/api/task/publish');
};

/** 获取我接受的 */
export const getAcceptTasks = () => {
  return instance.get('/api/task/accept');
};

/**
 * 获取任务详情
 * @param _id 任务id
 * @returns 
 */
export const getDetail = (_id: string) => {
  return instance.get('/api/task/detail', {
    params: { _id }
  });
};