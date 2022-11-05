<template>
  <van-tabs v-model:active="active">
    <van-tab title="我发布的"></van-tab>
    <van-tab title="我接受的"></van-tab>
  </van-tabs>

  <div class="main-content">
    <van-pull-refresh style="min-height: 80vh" v-model="loading" @refresh="onRefresh">
      <van-list
        class="task-list"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-skeleton title :row="3" :loading="firstLoading">
          <Task v-for="item in taskList" :key="item._id" :item="item"></Task>
        </van-skeleton>
      </van-list>
    </van-pull-refresh>
  </div>
  <Docker :currentIndex="1" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Task from '../../components/Task.vue';
import Docker from '../../components/Docker.vue';
import { useTask } from '../../composables/useTask';
import { Toast } from 'vant';

const { page, loading, finished, firstLoading, taskList, handleTaskList } = useTask();
const active = ref(0);

// 触底加载
const onLoad = () => {
  console.log(1);
  handleTaskList(active.value);
};

const onRefresh = () => {
  page.value = 1;
  taskList.value = [];
  finished.value = false;
  loading.value = true;
  onLoad();
  Toast('刷新成功');
};

watch(
  () => active.value,
  () => {
    onRefresh();
  }
);
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
:deep(.van-skeleton) {
  margin-top: 10px;
  padding-top: 15px;
  height: 140px;
  box-sizing: border-box;
  background-color: #fff;
}

:deep(.van-tabs__wrap) {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

:deep(.van-tabs) {
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
