<template>
  <van-nav-bar title="商城" />
  <div class="main-content">
    <Balance />
    <div class="good-list">
      <Good v-for="(item, index) in goodsList" :key="item.id" :item="item" :balance="balance" @change="getBalance()"></Good>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script lang="ts" setup>
import Balance from './Balance.vue';
import Docker from '../../components/Docker.vue';
import Good, { GoodProps } from './Good.vue';
import { storeToRefs } from 'pinia';
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue';
import { mainStore } from '../../store';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const goodsList = ref<GoodProps[]>([]);
const store = mainStore();
const { balance } = storeToRefs(store);
const { getBalance } = store;

// 获取商品列表
const getGoodsList = () => {
  proxy?.$http
    .get('/goodAdd', {
      headers: { token: localStorage.getItem('token') }
    })
    .then((res) => (goodsList.value = res.data));
};
getGoodsList();
</script>

<style lang="less" scoped>
.good-list {
  padding: 0 0 10px;
}
</style>
