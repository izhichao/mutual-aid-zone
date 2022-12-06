import { ref } from 'vue';
import { getPublishTasks, getAcceptTasks, getTasks, getSearchTasks } from '../api/task';
import { ReturnTaskType } from '../types/task';

export const useTaskList = () => {
  const taskList = ref<ReturnTaskType[]>([]);

  // 获取任务列表
  const firstLoading = ref(false);
  const loading = ref(false);
  const finished = ref(false);
  const page = ref(1);
  const handleTaskList = async (active: number) => {
    const pageSize = 5; // 设置每次请求的大小
    let total = 0; // 任务总数

    // 节流，若上一次请求未完成，则直接 return
    let isLock = false;
    if (isLock) return;
    isLock = true;

    // 若100ms内未获取到数据 则展示骨架屏
    setTimeout(() => {
      if (!taskList.value.length) {
        firstLoading.value = true;
      }
    }, 100);

    if (active === 0) {
      const { data: res } = await getPublishTasks(page.value, pageSize);
      taskList.value = [...taskList.value, ...res.data.list];
      total = res.data.total;
    } else if (active === 1) {
      const { data: res } = await getAcceptTasks(page.value, pageSize);
      taskList.value = [...taskList.value, ...res.data.list];
      total = res.data.total;
    } else {
      const { data: res } = await getTasks(page.value, pageSize);
      taskList.value = [...taskList.value, ...res.data.list];
      total = res.data.total;
    }

    // 当页面还未加载完时，增大 page 的值；加载完毕时，将 finished 设置为 true
    if (page.value * pageSize <= total) {
      page.value++;
    } else {
      finished.value = true;
    }

    // 请求完成，将各类状态设置为 false
    isLock = false;
    loading.value = false;
    firstLoading.value = false;
  };

  const handleSearch = async (keyword: string) => {
    const { data: res } = await getSearchTasks(keyword);
    taskList.value = res.data;
  };

  return {
    page,
    taskList,
    loading,
    finished,
    firstLoading,
    handleTaskList,
    handleSearch
  };
};
