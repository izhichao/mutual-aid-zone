<template>
  <van-nav-bar title="联系客服" left-text="返回" left-arrow @click-left="handleBack" />

</template>

<script lang="ts" setup>
const handleBack = () => history.back();

</script>

<style lang="less" scoped>

</style>