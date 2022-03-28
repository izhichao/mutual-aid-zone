<template>
  <div class="header">
    <span class="header__avatar iconfont">&#xe6de;</span>

    <div class="header__swap">
      <slot></slot>
    </div>

    <a class="header__logout" @click.prevent="logout">注销</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HeaderTab',
  setup() {
    const router = useRouter();
    const logout = () => {
      alert('注销成功');
      localStorage.removeItem('token');
      router.push('/login');
    };
    return {
      logout
    };
  }
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #fff;
  height: (64vw / 3.75);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: #666 0px 0px 3px;

  &__avatar {
    color: #950040;
    font-size: (40vw / 3.75);
    margin-left: 20px;
  }

  &__logout {
    font-size: (16vw / 3.75);
    color: #950040;
    margin-right: 20px;
  }
}

.header__swap {
  display: flex;
  flex: 1;
  justify-content: center;
}
</style>
