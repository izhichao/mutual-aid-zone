<template>
  <div class="main">
    <h1>登录</h1>
    <div class="phone">
      <img src="/src/assets/name.png" alt />
      <input type="text" name="username" placeholder="请输入您的用户名" v-model.lazy="username" @keyup.enter="login" />
    </div>
    <div class="password">
      <img src="/src/assets/password.png" alt />
      <input type="password" name="password" placeholder="请输入您的密码" v-model.lazy="password" @keyup.enter="login" />
    </div>
    <input type="button" class="login" value="登 录" @click="login" />
    <router-link to="register" class="register">立即注册</router-link>
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'LoginView',
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const login = () => {
      proxy?.$http
        .post('/login', {
          username: username.value,
          password: password.value
        })
        .then((res) => {
          if (res.data.code === 20000) {
            alert('登录成功');
            localStorage.setItem('token', res.data.token);
            router.push('/');
          } else {
            alert('登录失败');
            username.value = '';
            password.value = '';
          }
        });
    };

    return {
      username,
      password,
      login
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

.login {
  position: absolute;
  top: 24.5rem;
  height: 2.5rem;
  width: 12rem;
  outline: none;
  color: #fff;
  background-color: #950040;
}

.register,
.register:hover {
  position: absolute;
  top: 28rem;
  color: #2b2b2b;
}
</style>
