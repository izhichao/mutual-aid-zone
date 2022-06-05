import { createRouter, createWebHashHistory } from 'vue-router';
import { handleDetail } from './composables/useUser';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home */ './views/Home/HomeView.vue')
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import(/* webpackChunkName: "task */ './views/Task/TaskView.vue')
  },
  {
    path: '/task/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "taskCreate */ './views/Task/TaskCreateView.vue')
  },
  {
    path: '/task/edit/:id',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "taskEdit */ './views/Task/TaskEditView.vue')
  },
  {
    path: '/task/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "taskDetail */ './views/Task/TaskDetailView.vue')
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import(/* webpackChunkName: "store" */ './views/Store/StoreView.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */ './views/My/MyView.vue')
  },
  {
    path: '/my/info',
    name: 'Info',
    component: () => import(/* webpackChunkName: "my" */ './views/My/MyInfo.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ './views/Login/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ './views/Register/RegisterView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  // 有token时，访问登录注册页跳转至首页
  const { name } = to;
  const isLoginOrRegister = name === 'Login' || name === 'Register';
  const isHome = name === 'Home';
  if (token) {
    // 有token时，获取当前用户信息
    handleDetail();
  }

  // 当没有token时，且访问的页面不是登录注册页时，跳转到登录页
  if (!token && !isLoginOrRegister && !isHome) {
    next({ name: 'Login' });
  } else if (token && isLoginOrRegister) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
