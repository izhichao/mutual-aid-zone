<template>
  <div class="header">
    <router-link :to="{ name: 'My' }" class="header__img" v-if="isLogin">
      <img src="https://zhichao.org/profile.jpg" />
    </router-link>
    <router-link :to="{ name: 'Login' }" class="header__login iconfont" v-else="isLogin">&#xe6de;</router-link>
    <van-search shape="round" placeholder="请输入搜索关键词" />
    <router-link :to="{ name: 'Home' }" class="header__chat iconfont">&#xe70a;</router-link>
  </div>

  <div class="main-content">
    <div class="task-list">
      <!-- 将各个任务通过props的方式传递给task组件 -->
      <Task v-for="(item, index) in taskList" :key="item._id" :item="item"></Task>
    </div>
  </div>

  <!-- 底栏 -->
  <router-link :to="{ name: 'Create' }">
    <van-button round icon="plus" type="primary" class="addBtn"></van-button>
  </router-link>
  <Docker :currentIndex="0" />
</template>

<script lang="ts" setup>
import Task, { TaskProps } from '../../components/Task.vue';
import Docker from '../../components/Docker.vue';
import { ref } from 'vue';
import { getTasks } from '../../api/task';

// 获取所有任务
const taskList = ref<TaskProps[]>([]);

const handleTaskList = async () => {
  const { data: res } = await getTasks();
  taskList.value = res.data;
};

handleTaskList();

// 顶栏头像(登录/未登录)
const isLogin = ref(false);
if (localStorage.getItem('token')) {
  isLogin.value = true;
}
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/mixins.less';
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: @cardBgColor;
  border-bottom: 1px solid @borderColor;

  &__img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-left: 15px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__login {
    height: 30px;
    width: 30px;
    line-height: 30px;
    font-size: 26px;
    margin-left: 15px;
    color: @fontColor;
  }

  &__chat {
    font-size: 26px;
    margin-right: 15px;
    color: @fontColor;
  }

  ::v-deep(.van-search) {
    flex: 1;
    height: 49px;

    &__content {
      background: #eeeff4;
    }
  }

  ::v-deep(.van-field__control) {
    color: #666;
  }
}

.task-list {
  padding: 0 0 10px;
}

.addBtn {
  position: absolute;
  z-index: 1;
  bottom: 74px;
  right: 24px;
  height: 44px;
  width: 44px;
  .shadow;
}
</style>
