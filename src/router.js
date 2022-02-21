import { createRouter, createWebHashHistory } from 'vue-router'

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import HelpMe from './components/HelpMe/HelpMe.vue'
import HelpMeMenu from './components/HelpMe/HelpMeMenu.vue'
import Store from './components/Store.vue'
import Task from './components/Task/Task.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', component: Home, redirect: '/helpme',
            children: [
                { path: 'helpme', component: HelpMe },
                { path: 'helpme/:id', component: HelpMeMenu, props: true },
                // { path: 'ihelp', component: IHelp },
                { path: 'store', component: Store },
                { path: 'Task', component: Task }
            ]
        },
        { path: '/login', component: Login },
        { path: '/register', component: Register }
    ]
})

export default router;