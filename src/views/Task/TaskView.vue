<template>
  <HeaderTab>
    <!-- 通过动态绑定page_on类名用于顶栏切换 -->
    <span class="header__swap__one" @click="headerTabStatus = true" :class="{ 'header__swap--active': headerTabStatus }">我的任务</span>
    <span class="header__swap__two" @click="headerTabStatus = false" :class="{ 'header__swap--active': !headerTabStatus }">我发布的</span>
  </HeaderTab>

  <div class="main-content">
    <!-- type=1时 显示我的任务 -->
    <TaskList :type="1" v-if="headerTabStatus" />
    <!-- type=2时 显示我发布的 -->
    <TaskList :type="2" v-else />
  </div>
  <Docker :currentIndex='1'/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TaskList from '../../components/Task/TaskList.vue';
import HeaderTab from '../../components/Tab/HeaderTab.vue';
import Docker from '../../components/Docker.vue';

const headerTabStatus = ref(true);
</script>
