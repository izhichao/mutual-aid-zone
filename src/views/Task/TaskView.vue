<template>
  <van-tabs v-model:active="active">
    <van-tab title="我发布的"></van-tab>
    <van-tab title="我接受的"></van-tab>
  </van-tabs>

  <div class="main-content">
    <div class="task-list">
      <Task v-for="item in taskList" :key="item._id" :item="item"></Task>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Task, { TaskProps } from '../../components/Task.vue';
import Docker from '../../components/Docker.vue';
import { getAcceptTasks, getDispatchTasks } from '../../api/task';

const useTaskList = () => {
  const taskList = ref<TaskProps[]>([]);
  const active = ref(0);
  const handleTaskList = async (active: number) => {
    if (active === 0) {
      const { data: res } = await getDispatchTasks();
      taskList.value = res.data;
    } else {
      const { data: res } = await getAcceptTasks();
      taskList.value = res.data;
    }
  };

  watch(
    () => active.value,
    (newVal) => {
      handleTaskList(newVal);
    },
    { immediate: true }
  );
  return { taskList, active };
};

const { taskList, active } = useTaskList();
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
::v-deep(.van-tabs__wrap) {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

::v-deep(.van-tabs) {
  &__wrap {
    height: 49px;
    border-bottom: 1px solid @borderColor;
  }

  &__line {
    background: @themeColor;
  }
}

.task-list {
  padding: 0 0 10px;
}
</style>
