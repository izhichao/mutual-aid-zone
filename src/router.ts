import { createRouter, createWebHashHistory } from 'vue-router'

import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import HomeView from './views/HomeView.vue'
import IHelpView from './views/IHelpView.vue'
import HelpMeView from './views/HelpMeView.vue'
import StoreView from './views/StoreView.vue'
import TaskView from './views/TaskView.vue'
import HelpMeMenuView from './views/HelpMeMenuView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', component: HomeView, redirect: '/helpme',
            children: [
                { path: 'helpme', component: HelpMeView },  //首页帮帮我
                { path: 'helpme/:id', component: HelpMeMenuView, props: true }, //发布任务页
                { path: 'ihelp', component: IHelpView },
                { path: 'task', component: TaskView },
                { path: 'store', component: StoreView },    //商城页
            ]
        },
        { path: '/login', component: LoginView },
        { path: '/register', component: RegisterView }
    ]
})

// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem("token");
//     // 当没有token时，且访问的页面不是登录注册页时，跳转到登录页
//     // 有token时，访问登录注册页跳转至首页
//     if (!token && to.path !== "/login" && to.path !== "/register") {
//         next('/login');
//     } else if(token && (to.path === '/login' || to.path === '/register')) {
//         next('/helpme')
//     } else  {
//         next();
//     }
// })

export default router;