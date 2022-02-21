<template>
  <div>
      <router-view></router-view>
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