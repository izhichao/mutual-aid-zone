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
import Task from '../../components/Task.vue';
import Docker from '../../components/Docker.vue';
import { useTask } from '../../composables/useTask';

const { taskList, handleTaskList } = useTask();
const active = ref(0);
watch(
  () => active.value,
  (newVal) => {
    handleTaskList(newVal);
  },
  { immediate: true }
);
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
