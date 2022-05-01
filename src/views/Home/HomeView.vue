<template>
  <div class="header">
    <router-link :to="{ name: 'My' }" class="header__img">
      <img src="https://zhichao.org/profile.jpg" />
    </router-link>
    <van-search shape="round" placeholder="请输入搜索关键词" />
  </div>

  <div class="main-content">
    <TaskList :type="0" />
  </div>

  <Docker :currentIndex="0" />
</template>

<script lang="ts" setup>
import TaskList from '../../components/Task/TaskList.vue';
import Docker from '../../components/Docker.vue';
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ccc;

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
</style>
