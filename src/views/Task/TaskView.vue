<template>
  <van-tabs v-model:active="active">
    <van-tab title="我发布的"></van-tab>
    <van-tab title="我接受的"></van-tab>
  </van-tabs>

  <div class="main-content">
    <!-- type=1时 显示我的任务 -->
    <TaskList :type="1" v-show="headerTabStatus" />
    <!-- type=2时 显示我发布的 -->
    <TaskList :type="2" v-show="!headerTabStatus" />
  </div>
  <Docker :currentIndex="1" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import TaskList from '../../components/Task/TaskList.vue';
import Docker from '../../components/Docker.vue';

const headerTabStatus = ref(true);
const active = ref(0);
watch(
  () => active.value,
  (newVal) => {
    if (newVal === 1) {
      headerTabStatus.value = false;
    } else {
      headerTabStatus.value = true;
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
    border-bottom: 1px solid #ccc;
  }

  &__line {
    background-color: @themeColor;
  }
}
</style>
