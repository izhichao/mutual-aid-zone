<template>
  <div class="register">
    <h1>注册</h1>
    <van-form @submit="handleRegister" validate-trigger="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userModel.username"
          type="text"
          label="用户名"
          :rules="usernameRules"
          placeholder="请输入您的用户名"
          autocomplete="true"
          @keyup.enter="handleRegister"
        />
        <van-field
          v-model="userModel.phone"
          type="tel"
          label="手机号"
          :rules="phoneRules"
          placeholder="请输入您的手机号"
          autocomplete="true"
          @keyup.enter="handleRegister"
        />
        <van-field
          v-model="userModel.email"
          type="text"
          label="邮箱"
          :rules="emailRules"
          placeholder="请输入您的邮箱"
          autocomplete="true"
          @keyup.enter="handleRegister"
        />
        <van-field
          v-model="userModel.password"
          type="password"
          label="密码"
          :rules="passwordRules"
          placeholder="请输入您的密码"
          autocomplete="true"
          @keyup.enter="handleRegister"
        />
        <van-field
          v-model="userModel.passwordAgain"
          type="password"
          label="确认密码"
          :rules="passwordAgainRules"
          placeholder="请再次输入您的密码"
          autocomplete="true"
          @keyup.enter="handleRegister"
        />
      </van-cell-group>
      <van-button type="primary" round block class="register__btn" native-type="submit">注 册</van-button>
    </van-form>
    <router-link :to="{ name: 'Login' }" class="register__login">立即登录</router-link>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from '../../composables/useUser';
const { userModel, usernameRules, phoneRules, emailRules, passwordRules, passwordAgainRules, handleRegister } = useUser();
// 进入注册页时，重置用户信息
userModel.value = {
  username: '',
  password: '',
  phone: '',
  email: '',
  avatar: ''
};
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
