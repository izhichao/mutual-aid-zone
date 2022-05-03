<template>
  <div class="task-list">
    <!-- 将各个任务通过props的方式传递给task组件 -->
    <Task v-for="(item, index) in taskList" :key="item.id" :item="item" :type="type"></Task>
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';
import Task, { TaskProps } from '../Task.vue';

export default defineComponent({
  name: 'TaskList',
  props: {
    type: {
      type: Number,
      required: true
    }
  },
  components: {
    Task: Task
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
        // console.log(JSON.stringify(res.data));
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
  padding: 0 10px 10px;
}
</style>
