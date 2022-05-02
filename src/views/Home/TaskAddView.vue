<template>
  <van-nav-bar title="添加任务" left-text="返回" left-arrow @click="handleBack" />
  <div class="main-content">123</div>
</template>

<script lang="ts" setup>
const handleBack = () => history.back();
</script>

<style lang="less" scoped>
.main-content {
  bottom: 0;
}
</style>
