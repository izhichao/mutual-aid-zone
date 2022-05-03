import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home */ './views/Home/HomeView.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import(/* webpackChunkName: "add */ './views/TaskAdd/TaskAddView.vue')
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import(/* webpackChunkName: "task */ './views/Task/TaskView.vue')
  },
  {
    path: '/task/:id',
    name: 'TaskDetail',
    component: () => import(/* webpackChunkName: "taskDetail */ './views/TaskDetail/TaskDetailView.vue')
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import(/* webpackChunkName: "wallet" */ './views/Wallet/WalletView.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */ './views/My/MyView.vue')
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

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   // 有token时，访问登录注册页跳转至首页
//   const { name } = to;
//   const isLoginOrRegister = name === 'Login' || name === 'Register';

//   // 当没有token时，且访问的页面不是登录注册页时，跳转到登录页
//   if (!token && !isLoginOrRegister) {
//     next({ name: 'Login' });
//   } else if (token && isLoginOrRegister) {
//     next({ name: 'Home' });
//   } else {
//     next();
//   }
// });

export default router;
