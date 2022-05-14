import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatTime } from '../utils/formatTime';
import { acceptTask, createTask, deleteTask, editTask, finishTask, getTaskDetail, giveupTask } from '../api/task';

export const useTask = () => {
  const route = useRoute();
  const router = useRouter();

  interface Task {
    _id?: string;
    title: string;
    content: string;
    price: number;
    setter?: string;
    getter?: string;
    imgs: any[];
    files?: any[];
    status?: number;
    created?: string;
  }

  const taskModel = ref<Task>({
    _id: '',
    title: '',
    content: '',
    price: null,
    setter: '',
    getter: '',
    imgs: [],
    files: [],
    status: null,
    created: ''
  });

  const btnStatus = reactive({
    publish: false,
    unaccept: false,
    accept: false
  });

  // TODO:用户名获取
  const userId = '123456';

  /** 根据id获取任务详情 */
  const handleDetail = async () => {
    const { data: res } = await getTaskDetail(route.params.id as string);
    res.data.created = formatTime(res.data.created);
    taskModel.value = res.data;
    return taskModel;
  };

  // 根据用户设置按钮状态
  route.params.id &&
    handleDetail().then((taskModel) => {
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
    taskModel.value.files.forEach((item) => {      
      formData.append('files', item.file);
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
    taskModel,
    btnStatus,
    handleSubmit,
    handleDelete,
    handlePushEdit,
    handleGiveup,
    handleFinish,
    handleAccept
  };
};
