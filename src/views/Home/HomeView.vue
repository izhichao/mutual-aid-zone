<template>
  <div class="header">
    <router-link :to="{ name: 'My' }" class="header__img" v-if="isLogin">
      <img :src="userModel.avatar" />
    </router-link>
    <router-link :to="{ name: 'Login' }" class="header__login iconfont" v-else="isLogin">&#xe6de;</router-link>
    <van-search shape="round" v-model="keyword" placeholder="请输入搜索关键词" @search="handleSearch(keyword)" />
    <router-link :to="{ name: 'Chat' }" class="header__chat iconfont">&#xe70a;</router-link>
  </div>

  <div class="main-content">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list
        class="task-list"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-skeleton title :row="3" :loading="firstLoading">
          <Task v-for="item in taskList" :key="item._id" :item="item"></Task>
        </van-skeleton>
      </van-list>
    </van-pull-refresh>
  </div>

  <router-link :to="{ name: 'Create' }">
    <van-button round icon="plus" type="primary" class="addBtn"></van-button>
  </router-link>
  <Docker :currentIndex="0" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Task from '../../components/Task.vue';
import Docker from '../../components/Docker.vue';
import { useUser } from '../../composables/useUser';
import { useTaskList } from '../../composables/useTaskList';
import { Toast } from 'vant';

const { page, loading, finished, firstLoading, taskList, handleSearch, handleTaskList } = useTaskList();
const keyword = ref('');

// 触底加载
const onLoad = () => {
  handleTaskList(-1);
};

const onRefresh = () => {
  page.value = 1;
  taskList.value = [];
  finished.value = false;
  loading.value = true;
  onLoad();
  Toast('刷新成功');
};

// 顶栏头像(登录/未登录)
const isLogin = ref(false);
const { userModel } = useUser();
if (localStorage.getItem('token')) {
  isLogin.value = true;
}
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/mixins.less';
:deep(.van-skeleton) {
  margin-top: 10px;
  padding-top: 15px;
  height: 140px;
  box-sizing: border-box;
  background-color: #fff;
}
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

  :deep(.van-search) {
    flex: 1;
    height: 49px;

    &__content {
      background: #eeeff4;
    }
  }

  :deep(.van-field__control) {
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
