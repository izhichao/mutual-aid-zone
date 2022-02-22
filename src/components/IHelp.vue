<template>
    <div class="main">
        <header-tab>
            <router-link to="/helpme" class="swap_1">帮帮我</router-link>
            <router-link to="/ihelp" class="swap_2 page_on">我来帮</router-link>
        </header-tab>

        <div class="item_task_list">
            <!-- 将各个任务通过props的方式传递给task-list组件 -->
            <task-list v-for="(item,index) in taskList" :key="item.id" :item="item" type="0"></task-list>
        </div>
        
    </div>
</template>

<script>
import HeaderTab from "./Tab/HeaderTab.vue";
import TaskList from "./Task/TaskList.vue";
export default {
    name: "IHelp",
    components: {
        HeaderTab,
        TaskList,
    },
    data() {
        return {
            taskList: [],
        };
    },
    async created() {
        // 在created阶段获取所有任务
        const { data: res } = await this.$http.get("/task", {
            params: { type: 0 },
            headers: { token: localStorage.getItem("token") },
        });
        // 将所有任务转存到taskList中
        this.taskList = res;
    },
};
</script>

<style scoped>
.item_task_list {
    height: auto;
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.main {
    margin-bottom: 5rem;
}
</style>