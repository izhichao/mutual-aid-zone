<template>
  <div class="docker">
    <router-link v-for="(item, index) in dockerList" :key="item.to.name" :to="item.to" :class="{ docker__item: true, 'docker__item--active': currentIndex == index }">
      <i class="iconfont" v-html="item.icon"></i>
      <p>{{ item.text }}</p>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  currentIndex: Number
});

const dockerList = [
  { icon: '&#xe600;', text: '互助圈', to: { name: 'Home' } },
  { icon: '&#xe651;', text: '任务', to: { name: 'Task' } },
  { icon: '&#xe71e;', text: '商城', to: { name: 'Store' } },
  { icon: '&#xe636;', text: '我的', to: { name: 'My' } }
];
</script>

<style lang="less" scoped>
@import '../style/variables.less';
.docker {
  position: absolute;
  display: flex;
  align-items: center;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  background: @cardBgColor;
  border-top: 1px solid @borderColor;
  padding: 0 20px;
  box-sizing: border-box;

  &__item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    i {
      font-size: 22px;
    }

    p {
      font-size: 12px;
    }

    &--active {
      i,
      p {
        color: @themeColor;
      }
    }
  }
}
</style>
