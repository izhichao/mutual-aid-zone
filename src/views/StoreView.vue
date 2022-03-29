<template>
  <HeaderTab>
    <span class="header__swap__one header__swap--active">商城</span>
  </HeaderTab>
  <div class="main-content">
    <Wallet />
    <GoodList />
  </div>
</template>

<script lang="ts">
import HeaderTab from '../components/Tab/HeaderTab.vue';
import Wallet from '../components/Store/Wallet.vue'
import GoodList from '../components/Store/GoodList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StoreView',
  components: {
    HeaderTab,
    Wallet,
    GoodList
  }
});
</script>

<style lang="less" scoped>
.header__swap__one {
  border-radius: (24vw / 3.75) !important;
  width: (192vw / 3.75) !important;
}
</style>
