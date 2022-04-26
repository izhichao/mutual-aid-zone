<template>
  <div class="login">
    <h1>登录</h1>
    <van-cell-group inset>
      <van-field v-model="username" type="text" label="用户名" placeholder="请输入您的用户名" @keyup.enter="login" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入您的密码" @keyup.enter="login" />
    </van-cell-group>
    <van-button type="primary" class="login__loginBtn" @click="login">登 录</van-button>
    <router-link to="register" class="login__register">立即注册</router-link>
  </div>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const username = ref('');
const password = ref('');
const router = useRouter();
const login = () => {
  Toast('登录测试');
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
</script>

<style lang="less" scoped>
@import '../../style/variables.less';

.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @themeBgColor;
  text-align: center;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;

  h1 {
    margin: 1rem 0 .5rem;
    font-size: 0.32rem;
  }
  &__loginBtn {
    display: block;
    font-size: 0.16rem;
    height: 0.4rem;
    width: 2rem;
    margin: 0.3rem auto;
  }

  &__register {
    display: block;
    font-size: 0.16rem;
    margin-top: 0.2rem;
    color: rgb(112, 112, 112);
  }
}
</style>
