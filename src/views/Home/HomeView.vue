<template>
  <HeaderTab>
    <router-link to="/helpme" class="header__swap__one">帮帮我</router-link>
    <router-link to="/ihelp" class="header__swap__two header__swap--active">我来帮</router-link>
  </HeaderTab>

  <div class="header">
    
  </div>

  <div class="main-content">
    <TaskList :type="0" />
  </div>

  <Docker :currentIndex="0"/>
</template>

<script lang="ts" setup>
import HeaderTab from '../../components/Tab/HeaderTab.vue';
import TaskList from '../../components/Task/TaskList.vue';
import Docker from '../../components/Docker.vue';
</script>
