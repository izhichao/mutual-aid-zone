<template>
  <div class="task-list">
    <!-- 将各个任务通过props的方式传递给task组件 -->
    <TaskItem v-for="(item, index) in taskList" :key="item.id" :item="item" :type="type"></TaskItem>
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';
import TaskItem, { TaskProps } from './TaskItem.vue';

export default defineComponent({
  name: 'TaskList',
  props: {
    type: {
      type: Number,
      required: true
    }
  },
  components: {
    TaskItem
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const taskList = ref<TaskProps[]>([]);
    // 获取所有任务
    proxy?.$http
      .get('/task', {
        params: { type: props.type },
        headers: { token: localStorage.getItem('token') }
      })
      .then((res) => {
        // 将所有任务转存到taskList中
        taskList.value = res.data;
      });
    return {
      taskList
    };
  }
});
</script>

<style lang="less" scoped>
.task-list {
  padding: 0 (10vw / 3.75) (10vw / 3.75);
}
</style>
