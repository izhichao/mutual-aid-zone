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
      <span @click="showForget = true">忘记密码</span>
    </div>
  </div>

  <van-popup v-model:show="showForget" round>
    <div class="forget">
      <van-form @submit="handleForgetPassword" validate-trigger="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="emailForget"
            type="text"
            label="邮箱"
            autocomplete="true"
            placeholder="请输入您的邮箱"
            :rules="emailRules"
            @keyup.enter="handleForgetPassword"
          />
        </van-cell-group>
        <van-button type="primary" class="small-btn" round native-type="submit" >立即找回</van-button>
      </van-form>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUser } from '../../composables/useUser';

const showForget = ref(false);
const { userModel, emailForget, usernameRules, passwordRules, emailRules, handleLogin, handleForgetPassword } =
  useUser();
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
    a,
    span {
      color: @fontLightColor;
      margin: 0 10px;
    }
  }
}

.forget {
  width: 80vw;
  padding: 20px 0;
  text-align: center;
  .van-button {
    margin-top: 10px;
  }
}
</style>
