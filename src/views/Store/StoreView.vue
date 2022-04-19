<template>
  <HeaderTab>
    <span class="header__swap__one header__swap--active">商城</span>
  </HeaderTab>
  <div class="main-content">
    <Wallet />
    <GoodList />
  </div>
  <Docker :currentIndex='2'/>
</template>

<script lang="ts">
import HeaderTab from '../../components/Tab/HeaderTab.vue';
import Wallet from './Wallet.vue';
import GoodList from './GoodList.vue';
import Docker from '../../components/Docker.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StoreView',
  components: {
    HeaderTab,
    Wallet,
    GoodList,
    Docker
  }
});
</script>

<style lang="less" scoped>
.header__swap__one {
  border-radius: (24vw / 3.75) !important;
  width: (192vw / 3.75) !important;
}
</style>
