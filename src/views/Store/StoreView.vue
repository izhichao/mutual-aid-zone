<template>
  <van-nav-bar title="商城" />
  <div class="main-content">
    <Wallet />
    <GoodList />
  </div>
  <Docker :currentIndex="2" />
</template>

<script lang="ts" setup>
import Wallet from './Wallet.vue';
import GoodList from './GoodList.vue';
import Docker from '../../components/Docker.vue';
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
::v-deep(.van-nav-bar) {
  &__content {
    height: 49px;
    border-bottom: 1px solid @borderColor;
  }
}
</style>
