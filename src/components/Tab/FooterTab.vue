<template>
  <div class="footer">
    <router-link to="/" class="footer__sub">
      <i class="iconfont" :class="{ on: indexFontStatus }">&#xe600;</i>
      <p :class="{ on: indexFontStatus }">互助圈</p>
    </router-link>

    <router-link to="/task" class="footer__sub">
      <i class="iconfont" :class="{on: $route.path === '/task'}">&#xe651;</i>
      <p :class="{on: $route.path === '/task'}">任务</p>
    </router-link>

    <router-link to="/store" class="footer__sub">
      <i class="iconfont" :class="{on: $route.path === '/store'}">&#xe688;</i>
      <p :class="{on: $route.path === '/store'}">商城</p>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'FooterTab',
  setup() {
    const route = useRoute();
    const indexFontStatus = computed(() => {
      if (/^\/helpme/g.test(route.path) || route.path === '/ihelp') {
        return true;
      } else {
        return false;
      }
    });
    return {
      indexFontStatus
    };
  }
});
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  height: (64vw / 3.75);
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: #666 0px 0px 3px;

  &__sub {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    i {
      color: #707070;
      font-size: (28vw / 3.75);
    }

    p {
      color: #707070;
      font-size: (16vw / 3.75);
    }

    .on {
      color: #950040;
    }
  }
}
</style>
