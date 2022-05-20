import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatTime } from '../utils/formatTime';
import {
  acceptTask,
  createTask,
  deleteTask,
  editTask,
  finishTask,
  getAcceptTasks,
  getPublishTasks,
  getTaskDetail,
  getTasks,
  giveupTask
} from '../api/task';

export const useTask = () => {
  const route = useRoute();
  const router = useRouter();

  const rules = [{ required: true, message: '请填写完整' }]; // 获取所有任务

  interface Task {
    _id?: string;
    title: string;
    content: string;
    price: number;
    setter?: string;
    getter?: string;
    imgs: any[];
    imgFiles?: any[];
    status?: number;
    createdAt?: string;
    [propName: string]: any;
  }

  const taskModel = ref<Task>({
    _id: '',
    title: '',
    content: '',
    price: null,
    setter: '',
    getter: '',
    imgs: [],
    imgFiles: [],
    status: null,
    createdAt: ''
  });
  const taskList = ref<Task[]>([]);

  const btnStatus = reactive({
    publish: false,
    unaccept: false,
    accept: false
  });

  // 获取任务列表
  const handleTaskList = async (active: number) => {
    if (active === 0) {
      const { data: res } = await getPublishTasks();
      taskList.value = res.data;
    } else if (active === 1) {
      const { data: res } = await getAcceptTasks();
      taskList.value = res.data;
    } else {
      const { data: res } = await getTasks();
      taskList.value = res.data;
    }
  };

  // 根据id获取任务详情
  const handleDetail = async () => {
    const { data: res } = await getTaskDetail(route.params.id as string);
    // 格式化时间
    res.data.createdAt = formatTime(res.data.createdAt);
    taskModel.value = res.data;
    return taskModel;
  };

  // 根据用户设置按钮状态
  route.params.id &&
    handleDetail().then((taskModel) => {
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      if (taskModel.value.status === 2) {
        return;
      }
      if (taskModel.value.setter === userId) {
        // 任务发布者
        btnStatus.publish = true;
      } else if (taskModel.value.getter === userId) {
        // 任务接收者
        btnStatus.accept = true;
      } else if (taskModel.value.status !== 1) {
        // 任务未接单时，路人浏览
        btnStatus.unaccept = true;
      }
    });

  const handleSubmit = (type: string) => {
    const formData = new FormData();
    formData.append('title', taskModel.value.title);
    formData.append('price', taskModel.value.price.toString());
    formData.append('content', taskModel.value.content);
    taskModel.value.imgFiles &&
      taskModel.value.imgFiles.forEach((item) => {
        formData.append('imgFiles', item.file);
      });

    if (type === 'create') {
      createTask(formData);
    } else if (type === 'edit') {
      formData.append('_id', route.params.id.toString());
      editTask(formData);
    }
  };
  const handleDelete = () => {
    deleteTask(taskModel.value._id);
  };
  const handlePushEdit = () => {
    router.push({ name: 'Edit', params: { id: route.params.id } });
  };
  const handleGiveup = () => {
    giveupTask(taskModel.value._id);
  };
  const handleFinish = () => {
    finishTask(taskModel.value._id);
  };
  const handleAccept = () => {
    acceptTask(taskModel.value._id);
  };

  return {
    rules,
    taskModel,
    taskList,
    btnStatus,
    handleTaskList,
    handleSubmit,
    handleDelete,
    handlePushEdit,
    handleGiveup,
    handleFinish,
    handleAccept
  };
};
