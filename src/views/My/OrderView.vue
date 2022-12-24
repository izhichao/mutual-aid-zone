<template>
  <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="order-list">
      <Order></Order>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Order from '../../components/Order.vue';
const handleBack = () => history.back();
</script>

<style lang="less" scoped>
.order-list {
  padding: 0 0 10px;
}
</style>
