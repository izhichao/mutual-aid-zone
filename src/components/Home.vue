<template>
  <div>
      <!-- 根据路由展示不同内容 -->
      <router-view></router-view>
      <!-- 展示页面底栏 -->
      <footer-tab></footer-tab>
  </div>
</template>

<script>
import FooterTab from './Tab/FooterTab.vue'

export default {    
    name: 'Home',
    components: {
        FooterTab
    }
}
</script>

<style>

</style>