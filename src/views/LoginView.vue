<template>
  <div class="login">
    <h1>登录</h1>
    <div class="login__phone">
      <i class="iconfont">&#xe74c;</i>
      <input type="text" name="username" placeholder="请输入您的用户名" v-model.lazy="username" @keyup.enter="login" />
    </div>
    <div class="login__password">
      <i class="iconfont">&#xe736;</i>
      <input type="password" name="password" placeholder="请输入您的密码" v-model.lazy="password" @keyup.enter="login" />
    </div>
    <input type="button" class="login__loginBtn" value="登 录" @click="login" />
    <router-link to="register" class="login__register">立即注册</router-link>
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
.login {
  height: 100vh;
  background-color: #eeeff4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: (32vw / 3.75);
  }

  &__phone,
  &__password {
    margin-top: (10vw / 3.75);
    display: flex;

    i {
      font-size: (32vw / 3.75);
      margin-right: (10vw / 3.75);
      color: rgb(112, 112, 112); 
    }

    input {
      width: (160vw / 3.75);
      height: (32vw / 3.75);
      padding: 0 0.5rem;
      outline: none;
      border: 1px solid #d9d9d6;
    }
  }

  &__loginBtn {
    margin-top: (20vw / 3.75);
    height: 2.5rem;
    width: 12rem;
    outline: none;
    color: #fff;
    background-color: #950040;
  }

  &__register {
    margin-top: (15vw / 3.75);
    color: rgb(112, 112, 112);
  }
}
</style>
