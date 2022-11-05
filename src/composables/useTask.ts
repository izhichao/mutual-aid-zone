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
  getSearchTasks,
  getTaskDetail,
  getTasks,
  giveupTask
} from '../api/task';
import { Toast } from 'vant';

export const useTask = () => {
  const route = useRoute();
  const router = useRouter();

  const rules = [{ required: true, message: '请填写完整' }];
  const keyword = ref('');
  const titleRules = [
    ...rules,
    {
      validator: (val: string) => {
        if (val.length > 15) {
          return '标题不能超过15字';
        } else if (val.length < 3) {
          return '标题不能少于3字';
        }
      }
    }
  ];
  const priceRules = [
    ...rules,
    {
      validator: (val: number) => {
        if (val < 0) {
          return '价格不能为小于零';
        } else if (val >= 1000) {
          return '价格不能超过1000';
        }
      }
    }
  ];

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

  // 根据id获取任务详情
  const handleDetail = async () => {
    const { data: res } = await getTaskDetail(route.params.id as string);
    if (res.errno === 0) {
      // 格式化时间
      res.data.createdAt = formatTime(res.data.createdAt);
      taskModel.value = res.data;
      return taskModel;
    } else {
      Toast(res.msg);
      router.push('/');
    }
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

  const handleSubmit = async (type: string) => {
    const formData = new FormData();
    formData.append('title', taskModel.value.title);
    formData.append('price', taskModel.value.price.toString());
    formData.append('content', taskModel.value.content);
    taskModel.value.imgFiles &&
      taskModel.value.imgFiles.forEach((item) => {
        formData.append('imgFiles', item.file);
      });

    if (type === 'create') {
      const { data: res } = await createTask(formData);
      if (res.errno === 0) {
        router.push({ name: 'Detail', params: { id: res.data._id } });
        Toast('发布成功');
      } else {
        Toast(res.msg);
      }
    } else if (type === 'edit') {
      formData.append('_id', route.params.id.toString());
      const { data: res } = await editTask(formData);
      if (res.errno === 0) {
        router.push({ name: 'Detail', params: { id: res.data._id } });
        Toast('编辑成功');
      } else {
        Toast(res.msg);
      }
    }
  };
  const handleDelete = () => {
    deleteTask(taskModel.value._id);
    Toast('删除成功');
    router.push({ name: 'Home' });
  };
  const handlePushEdit = () => {
    router.push({ name: 'Edit', params: { id: route.params.id } });
  };
  const handleGiveup = () => {
    giveupTask(taskModel.value._id);
    Toast('放弃成功');
    router.go(0);
  };
  const handleFinish = () => {
    finishTask(taskModel.value._id);
    Toast('任务完成');
    router.go(0);
  };
  const handleAccept = () => {
    acceptTask(taskModel.value._id);
    Toast('接受成功');
    router.go(0);
  };
  return {
    page,
    keyword,
    loading,
    finished,
    firstLoading,
    rules,
    titleRules,
    priceRules,
    taskModel,
    taskList,
    btnStatus,
    handleTaskList,
    handleSearch,
    handleSubmit,
    handleDelete,
    handlePushEdit,
    handleGiveup,
    handleFinish,
    handleAccept
  };
};
