<template>
  <van-nav-bar title="我的" />

  <Docker :currentIndex="3" />
</template>

<script lang="ts" setup>
import Docker from '../../components/Docker.vue';
</script>

<style lang="less" scoped>
::v-deep(.van-nav-bar) {
  &__content {
    height: 49px;
    border-bottom: 1px solid #ccc;
  }
}</style>
