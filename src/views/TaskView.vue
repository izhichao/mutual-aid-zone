<template>
  <div class="main">
    <header-tab>
      <!-- 通过动态绑定page_on类名用于顶栏切换 -->
      <span class="swap_3" @click="headerTabStatus = true" :class="headerTabStatus ? 'page_on' : ''">我的任务</span>
      <span class="swap_4" @click="headerTabStatus = false" :class="headerTabStatus ? '' : 'page_on'">我发布的</span>
    </header-tab>
    <div class="item_task_list">
      <!-- 当headerTabStatus为true时，显示我的任务 -->
      <task-list v-for="(item, index) in iGetList" :key="item.id" :item="item" :type="1" v-if="headerTabStatus"></task-list>

      <!-- 当headerTabStatus为false时，显示我发布的任务 -->
      <task-list v-for="(item, index) in iPublishList" :key="item.id" :item="item" :type="2" v-else></task-list>
    </div>
  </div>
</template>

<script lang="ts">
import TaskList from '../components/TaskList.vue';
import HeaderTab from '../components/Tab/HeaderTab.vue';
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';

export default defineComponent({
  name: 'Task',
  components: {
    TaskList,
    HeaderTab
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const headerTabStatus = ref(true);
    const iPublishList = ref([]);
    const iGetList = ref([]);

    // 将我的任务转存到iGetList中
    const getIGetList = () => {
      proxy?.$http
        .get('/task', {
          params: { type: 1 },
          headers: { token: localStorage.getItem('token') }
        })
        .then((res) => {
          iGetList.value = res.data;
        });
    };
    getIGetList();

    // 将我发布的任务转存到iPublishList中
    const getIPublishList = () => {
      proxy?.$http
        .get('/task', {
          params: { type: 2 },
          headers: { token: localStorage.getItem('token') }
        })
        .then((res) => {
          iPublishList.value = res.data;
        });
    };
    getIPublishList();
    
    return {
      headerTabStatus,
      iPublishList,
      iGetList
    };
  }
});
</script>

<style scoped>
.item_task_list {
  height: auto;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.main {
  margin-bottom: 5rem;
}
</style>
