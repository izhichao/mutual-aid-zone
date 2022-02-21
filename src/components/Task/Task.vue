<template>
    <div>
        <header-tab></header-tab>
        <div class="item_task_list">
            <task-list></task-list>
        </div>
    </div>
</template>

<script>
import TaskList from "./TaskList.vue";
import HeaderTab from "../Tab/HeaderTab.vue";

export default {
    name: "Task",
    components: {
        TaskList,
        HeaderTab,
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
</style>