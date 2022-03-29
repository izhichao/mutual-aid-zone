<template>
  <div>
    <!-- 根据路由展示不同内容 -->
    <router-view></router-view>
    <!-- 展示页面底栏 -->
    <FooterTab></FooterTab>
  </div>
</template>

<script lang="ts">
import FooterTab from '../components/Tab/FooterTab.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    FooterTab
  }
});
</script>
