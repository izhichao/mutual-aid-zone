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
