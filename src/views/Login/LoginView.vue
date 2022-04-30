<template>
  <div class="login">
    <h1>登录</h1>
    <van-cell-group inset>
      <van-field v-model="username" type="text" label="用户名" placeholder="请输入您的用户名" @keyup.enter="handleLogin" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入您的密码" @keyup.enter="handleLogin" />
    </van-cell-group>
    <van-button type="primary" class="login__btn" @click="handleLogin">登 录</van-button>
    <router-link :to="{ name: 'Register' }" class="login__register">立即注册</router-link>
  </div>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();

const useLoginEffect = () => {
  const username = ref('');
  const password = ref('');
  const handleLogin = () => {
    proxy?.$http
      .post('/login', {
        username: username.value,
        password: password.value
      })
      .then((res) => {
        if (res.data.code === 20000) {
          Toast('登录成功');
          localStorage.setItem('token', res.data.token);
          router.push('/');
        } else {
          Toast('登录失败');
          username.value = '';
          password.value = '';
        }
      });
  };
  return { username, password, handleLogin };
};

const { username, password, handleLogin } = useLoginEffect();
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

  h1 {
    margin: 100px 0 50px;
    font-size: 32px;
  }
  &__btn {
    display: block;
    font-size: 16px;
    height: 40px;
    width: 200px;
    margin: 30px auto;
  }

  &__register {
    display: block;
    font-size: 16px;
    color: #707070;
  }
}
</style>
