import { createRouter, createWebHashHistory } from 'vue-router'

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import IHelp from './components/IHelp.vue'
import HelpMe from './components/HelpMe/HelpMe.vue'
import HelpMeMenu from './components/HelpMe/HelpMeMenu.vue'
import Store from './components/Store/Store.vue'
import Task from './components/Task/Task.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', component: Home, redirect: '/helpme',
            children: [
                { path: 'helpme', component: HelpMe },  //首页帮帮我
                { path: 'helpme/:id', component: HelpMeMenu, props: true }, //发布任务页
                { path: 'ihelp', component: IHelp },
                { path: 'task', component: Task },
                { path: 'store', component: Store },    //商城页
            ]
        },
        { path: '/login', component: Login },
        { path: '/register', component: Register }
    ]
})

export default router;