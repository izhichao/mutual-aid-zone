<template>
  <van-nav-bar title="添加任务" left-text="返回" left-arrow @click="handleBack" />
  123
</template>

<script lang="ts" setup>
const handleBack = () => history.back();
</script>

<style lang="less" scoped></style>
