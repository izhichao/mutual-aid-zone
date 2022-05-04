<template>
  <van-tabs v-model:active="active">
    <van-tab title="我发布的"></van-tab>
    <van-tab title="我接受的"></van-tab>
  </van-tabs>

  <div class="main-content">
    <div class="task-list">
      <!-- 将各个任务通过props的方式传递给task组件 -->
      <Task v-for="(item, index) in taskList" :key="item.id" :item="item"></Task>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance, ref, watch } from 'vue';
import Task, { TaskProps } from '../../components/Task.vue';
import Docker from '../../components/Docker.vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const taskList = ref<TaskProps[]>([]);
const active = ref(0);

proxy?.$http
  .get('/task', {
    params: { type: 1 },
    headers: { token: localStorage.getItem('token') }
  })
  .then((res) => {
    // 将所有任务转存到taskList中
    taskList.value = res.data;
  });

watch(
  () => active.value,
  (newVal) => {
    if (newVal === 1) {
      proxy?.$http
        .get('/task', {
          params: { type: newVal + 1 },
          headers: { token: localStorage.getItem('token') }
        })
        .then((res) => {
          // 将所有任务转存到taskList中
          taskList.value = res.data;
        });
    } else {
      proxy?.$http
        .get('/task', {
          params: { type: newVal + 1 },
          headers: { token: localStorage.getItem('token') }
        })
        .then((res) => {
          // 将所有任务转存到taskList中
          taskList.value = res.data;
        });
    }
  }
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
