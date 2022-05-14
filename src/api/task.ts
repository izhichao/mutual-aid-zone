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
export const getTaskDetail = (_id: string) => {
  return instance.get('/api/task/detail', {
    params: { _id }
  });
};

/**
 * 添加任务
 * @param formData 任务信息
 * @returns
 */
export const createTask = (formData: FormData) => {
  return instance.post('/api/task/create', formData);
};

/**
 * 删除任务
 * @param _id 任务id
 * @returns
 */
export const deleteTask = (_id: string) => {
  return instance.post('/api/task/delete', { _id });
};

/**
 * 编辑任务
 * @param formData 任务信息
 * @returns
 */
export const editTask = (formData: FormData) => {
  return instance.post('/api/task/edit', formData);
};

/**
 * 接受任务
 * @param _id 任务id
 * @returns
 */
export const acceptTask = (_id: string) => {
  return instance.post('/api/task/accept', { _id });
};

/**
 * 放弃任务
 * @param _id 任务id
 * @returns
 */
export const giveupTask = (_id: string) => {
  return instance.post('/api/task/giveup', { _id });
};

/**
 * 完成任务
 * @param _id 任务id
 * @returns
 */
export const finishTask = (_id: string) => {
  return instance.post('/api/task/finish', { _id });
};
