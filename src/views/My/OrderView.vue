<template>
  <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="order-list">
      <Order v-for="item in ordersList" :item="item"></Order>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Order from '../../components/Order.vue';
import { getOrders } from '../../api/order';

const handleBack = () => history.back();

// 获取订单列表
const ordersList = ref([]);
const handleOrders = async () => {
  const { data: res } = await getOrders();
  ordersList.value = res.data;
};
handleOrders();
</script>

<style lang="less" scoped>
.order-list {
  padding: 0 0 10px;
}
</style>
