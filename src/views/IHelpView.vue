<template>
  <div class="main">
    <header-tab>
      <router-link to="/helpme" class="swap_1">帮帮我</router-link>
      <router-link to="/ihelp" class="swap_2 page_on">我来帮</router-link>
    </header-tab>

    <div class="item_task_list">
      <!-- 将各个任务通过props的方式传递给task组件 -->
      <task v-for="(item, index) in taskList" :key="item.id" :item="item" :type="0"></task>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderTab from '../components/Tab/HeaderTab.vue';
import Task, { TaskProps } from '../components/Task.vue';
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';

export default defineComponent({
  name: 'IHelp',
  components: {
    HeaderTab,
    Task
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const taskList = ref<TaskProps[]>([]);
    // 获取所有任务
    proxy?.$http
      .get('/task', {
        params: { type: 0 },
        headers: { token: localStorage.getItem('token') }
      })
      .then((res) => {
        // 将所有任务转存到taskList中
        taskList.value = res.data;
      });
      return {
        taskList
      }
  }
});
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
