import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatTime } from '../utils/formatTime';
import { getTaskDetail } from '../api/task';
import { Toast } from 'vant';
import { ITask } from '../types';

export const useTask = () => {
  const route = useRoute();
  const router = useRouter();

  const TaskModel = ref<ITask>({
    _id: '',
    title: '',
    content: '',
    price: null,
    setter: { _id: '' },
    getter: { _id: '' },
    imgFiles: [],
    imgs: [],
    status: null,
    createdAt: ''
  });
  const handleBack = () => router.go(-1);

  // 根据id获取任务详情
  const handleDetail = async () => {
    const { data: res } = await getTaskDetail(route.params.id as string);
    if (res.errno === 0) {
      // 格式化时间
      res.data.createdAt = formatTime(res.data.createdAt);
      TaskModel.value = res.data;
      return TaskModel;
    } else {
      Toast(res.msg);
      router.push('/');
    }
  };

  return {
    TaskModel,
    handleBack,
    handleDetail
  };
};
