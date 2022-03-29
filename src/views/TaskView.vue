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
</template>

<script lang="ts">
import TaskList from '../components/Task/TaskList.vue';
import HeaderTab from '../components/Tab/HeaderTab.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TaskView',
  components: {
    HeaderTab,
    TaskList
  },
  setup() {
    const headerTabStatus = ref(true);
    return {
      headerTabStatus
    };
  }
});
</script>
