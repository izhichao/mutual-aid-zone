<template>
  <HeaderTab>
    <router-link to="/helpme" class="header__swap__one">帮帮我</router-link>
    <router-link to="/ihelp" class="header__swap__two header__swap--active">我来帮</router-link>
  </HeaderTab>

  <div class="main-content">
    <TaskList :type="0" />
  </div>
</template>

<script lang="ts">
import HeaderTab from '../components/Tab/HeaderTab.vue';
import TaskList from '../components/Task/TaskList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IHelpView',
  components: {
    HeaderTab,
    TaskList
  }
});
</script>
