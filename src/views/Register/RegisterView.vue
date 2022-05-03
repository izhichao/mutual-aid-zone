<template>
  <div class="register">
    <h1>注册</h1>
    <van-form @submit="handleRegister">
      <van-cell-group inset>
        <van-field v-model="username" type="text" label="用户名" placeholder="请输入您的用户名" @keyup.enter="handleRegister" />
        <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入您的手机号" @keyup.enter="handleRegister" />
        <van-field v-model="email" type="email" label="邮箱" placeholder="请输入您的邮箱" @keyup.enter="handleRegister" />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入您的密码" @keyup.enter="handleRegister" />
        <van-field v-model="passwordAgain" type="password" label="确认密码" placeholder="请再次输入您的密码" @keyup.enter="handleRegister" />
      </van-cell-group>
      <van-button type="primary" round block class="register__btn" native-type="submit">注 册</van-button>
    </van-form>
    <router-link :to="{ name: 'Login' }" class="register__login">立即登录</router-link>
  </div>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();

const useRegisterEffect = () => {
  const username = ref('');
  const phone = ref('');
  const email = ref('');
  const password = ref('');
  const passwordAgain = ref('');
  const handleRegister = () => {
    if (username.value === '' || password.value === '') return Toast('用户名或密码不能为空');
    proxy?.$http
      .post('/register', {
        username: username.value,
        password: password.value
      })
      .then(() => {
        Toast('注册成功');
        router.push('/login');
      });
  };
  return { username, phone, email, password, passwordAgain, handleRegister };
};

const { username, phone, email, password, passwordAgain, handleRegister } = useRegisterEffect();
</script>

<style lang="less" scoped>
@import '../../style/variables.less';

.register {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @themeBgColor;
  text-align: center;

  h1 {
    margin: 70px 0 30px;
    font-size: 32px;
  }
  &__btn {
    font-size: 16px;
    height: 40px;
    width: 120px;
    margin: 30px auto 20px;
  }

  &__login {
    color: @fontLightColor;
  }
}
</style>
