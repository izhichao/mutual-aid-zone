<template>
  <div>
    <!-- 通过插槽来显示不同的顶栏 -->
    <header-tab>
      <router-link to="/helpme" class="swap_1 page_on">帮帮我</router-link>
      <router-link to="/ihelp" class="swap_2">我来帮</router-link>
    </header-tab>
    <!-- 任务发布按钮 -->
    <div class="item">
      <div class="item__box">
        <div class="item__box__sub">
          <router-link to="/helpme/1" class="item__box__link">
            <i class="iconfont">&#xe6ab;</i>
            <span>拿快递</span>
          </router-link>
        </div>

        <div class="item__box__sub">
          <router-link to="/helpme/2" class="item__box__link">
            <i class="iconfont">&#xe64a;</i>
            <span>借东西</span>
          </router-link>
        </div>
      </div>

      <div class="item__box">
        <div class="item__box__sub">
          <router-link to="/helpme/3" class="item__box__link">
            <i class="iconfont">&#xe82e;</i>
            <span>卖二手</span>
          </router-link>
        </div>

        <div class="item__box__sub">
          <router-link to="/helpme/4" class="item__box__link">
            <i class="iconfont">&#xe60c;</i>
            <span>一起学习</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderTab from '../components/Tab/HeaderTab.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpMeView',
  components: {
    HeaderTab
  }
});
</script>

<style lang="less" scoped>
.item {
  position: absolute;
  width: 100%;
  top: (64vw / 3.75);
  bottom: (64vw / 3.75);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  &__box {
    flex: 1;
    display: flex;

    &__sub {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__link {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #950040;
      height: (160vw / 3.75);
      width: (160vw / 3.75);
      border-radius: 50%;
      i {
        font-size: (80vw / 3.75);
        color: #fff;
        margin-bottom: 10px;
      }

      span {
        font-size: (18vw / 3.75);
        font-weight: 700;
        color: #fff;
      }
    }
  }
}
</style>
