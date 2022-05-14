<template>
  <div class="login">
    <h1>登录</h1>
    <van-form @submit="handleLogin" validate-trigger="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userModel.username"
          type="text"
          label="用户名"
          :rules="usernameRules"
          placeholder="请输入您的用户名"
          autoComplete="true"
          @keyup.enter="handleLogin"
        />
        <van-field
          v-model="userModel.password"
          type="password"
          label="密码"
          :rules="passwordRules"
          autocomplete="true"
          placeholder="请输入您的密码"
          @keyup.enter="handleLogin"
        />
      </van-cell-group>
      <van-button type="primary" round class="login__btn" native-type="submit">登 录</van-button>
    </van-form>

    <div class="login__link">
      <router-link :to="{ name: 'Register' }">立即注册</router-link>
      <router-link :to="{ name: 'Register' }">忘记密码</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from '../../composables/useUser';
const { userModel, usernameRules, passwordRules, handleLogin } = useUser();
</script>

<style lang="less" scoped>
@import '../../style/variables.less';

.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: @themeBgColor;
  text-align: center;

  h1 {
    margin: 100px 0 30px;
    font-size: 32px;
  }
  &__btn {
    font-size: 16px;
    height: 40px;
    width: 120px;
    margin: 30px auto 20px;
  }

  &__link {
    a {
      color: @fontLightColor;
      margin: 0 10px;
    }
  }
}
</style>
