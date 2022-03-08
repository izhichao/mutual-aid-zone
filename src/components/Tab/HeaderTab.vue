<template>
  <header>
    <span class="touxiang">
      <img src="/src/assets/touxiang.png" />
    </span>

    <div class="swap">
      <slot></slot>
    </div>

    <a class="logout" @click.prevent="logout">注销</a>
  </header>
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

<style scoped>
header {
  display: flex;
  background-color: #fff;
  height: 4rem;
  position: relative;
  align-items: center;
  box-shadow: #666 0px 0px 3px;
}

.touxiang {
  position: absolute;
  height: 3rem;
  left: 1.5rem;
}

.touxiang img {
  height: 3rem;
  width: 3rem;
}

.swap {
  display: flex;
  flex: 1;
  justify-content: center;
}

.swap .swap_1,
.swap .swap_2,
.swap .swap_3,
.swap .swap_4 {
  font-size: 20px;
  height: 3rem;
  width: 6rem;
  align-self: center;
  line-height: 3rem;
  text-align: center;
  box-sizing: border-box;
  color: #999;
  border: 2px solid #950040;
}

.swap .swap_1,
.swap .swap_3 {
  border-right: none;
  border-radius: 1rem 0 0 1rem;
  box-sizing: border-box;
  color: #950040;
}

.swap .swap_2,
.swap .swap_4 {
  border-radius: 0 1rem 1rem 0;
  color: #950040;
}

.logout {
  position: absolute;
  font-size: 1.1rem;
  right: 1.5rem;
  color: #950040;
}

.logout:hover {
  color: #950040;
}
</style>
