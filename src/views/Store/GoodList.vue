<template>
  <div class="good-list">
    <GoodItem v-for="(item, index) in goodsList" :key="item.id" :item="item" :balance="balance" @change="getBalance()"></GoodItem>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';
import { mainStore } from '../../store';
import GoodItem, { GoodProps } from './GoodItem.vue';
export default defineComponent({
  name: 'GoodList',
  components: {
    GoodItem
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const goodsList = ref<GoodProps[]>([]);
    const store = mainStore();
    const { balance } = storeToRefs(store);
    
    // 获取商品列表
    const getGoodsList = () => {
      proxy?.$http
        .get('/goodAdd', {
          headers: { token: localStorage.getItem('token') }
        })
        .then((res) => (goodsList.value = res.data));
    };
    getGoodsList();

    return {
      goodsList,
      balance,
      getBalance: store.getBalance
    };
  }
});
</script>

<style lang="less" scoped>
.good-list {
  padding: 0 10px 10px;
}
</style>
