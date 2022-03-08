<template>
  <div class="main">
    <h1>注册</h1>
    <div class="phone">
      <img src="/src/assets/name.png" />
      <input type="text" name="username" placeholder="请输入您的用户名" v-model.lazy="username" @keyup.enter="register" />
    </div>
    <div class="password">
      <img src="/src/assets/password.png" />
      <input type="password" name="password" placeholder="请输入您的密码" v-model.lazy="password" @keyup.enter="register" />
    </div>
    <input type="button" class="register" value="注 册" @click="register" />
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'RegisterView',
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const register = () => {
      if (username.value === '' || password.value === '') return alert('用户名或密码不能为空');
      proxy?.$http
        .post('/register', {
          username: username.value,
          password: password.value
        })
        .then(() => {
          alert('注册成功');
          router.push('/login');
        });
    };
    return {
      username,
      password,
      register
    };
  }
});
</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  background-color: #eeeff4;
  display: flex;
  justify-content: center;
  position: relative;
}

h1 {
  position: absolute;
  top: 14rem;
  font-size: 32px;
}

.phone,
.password {
  display: flex;
  position: absolute;
}

.phone {
  top: 18rem;
}

.password {
  top: 21rem;
}

.phone img,
.password img {
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
}

.phone input,
.password input {
  width: 10rem;
  height: 2rem;
  padding: 0 0.5rem;
  outline: none;
  border: 1px solid #d9d9d6;
}

.register {
  position: absolute;
  top: 24.5rem;
  height: 2.5rem;
  width: 12rem;
  outline: none;
  color: #fff;
  background-color: #950040;
}
</style>
