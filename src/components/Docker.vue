<template>
  <div class="docker">
    <router-link v-for="(item, index) in dockerList" :key="item.to" :to="item.to" :class="{ docker__item: true, 'docker__item--active': currentIndex == index }">
      <i class="iconfont" v-html="item.icon"></i>
      <p>{{ item.text }}</p>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  currentIndex: Number
});

const dockerList = [
  { icon: '&#xe600;', text: '互助圈', to: { name: 'Home' } },
  { icon: '&#xe651;', text: '任务', to: { name: 'Task' } },
  { icon: '&#xe688;', text: '商城', to: { name: 'Store' } },
  { icon: '&#xe616;', text: '我的', to: { name: 'My' } }
];
</script>

<style lang="less" scoped>
@import '../style/variables.less';
.docker {
  position: absolute;
  display: flex;
  align-items: center;
  height: 0.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-top: 0.01rem solid #ccc;
  padding: 0 0.2rem;
  box-sizing: border-box;

  &__item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    i {
      color: #707070;
      font-size: 0.22rem;
    }

    p {
      color: #707070;
      font-size: 0.12rem;
    }

    &:last-child {
      i {
        font-weight: 600;
      }
    }

    &--active {
      i {
        color: @themeColor;
        font-size: 0.22rem;
      }

      p {
        color: @themeColor;
        font-size: 0.12rem;
      }
    }
  }
}
</style>
