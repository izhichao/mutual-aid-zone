<template>
  <van-nav-bar title="商城" />
  <div class="main-content">
    <Balance />
    <div class="good-list">
      <Good v-for="item in goodsList" :key="item._id" :item="item"></Good>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Balance from './Balance.vue';
import Good from './Good.vue';
import Docker from '../../components/Docker.vue';
import { getGoods } from '../../api/store';

// 获取商品列表
const goodsList = ref([]);
const handleGoods = async () => {
  const { data: res } = await getGoods();
  goodsList.value = res.data;
};
handleGoods();
</script>

<style lang="less" scoped>
.good-list {
  padding: 0 0 10px;
}
</style>
