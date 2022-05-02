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

  <router-link :to="{ name: 'Add' }">
    <van-button round icon="plus" type="primary" class="addBtn"></van-button>
  </router-link>
  <Docker :currentIndex="0" />
</template>

<script lang="ts" setup>
import TaskList from '../../components/Task/TaskList.vue';
import Docker from '../../components/Docker.vue';
</script>

<style lang="less" scoped>
@import '../../style/mixins.less';
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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
