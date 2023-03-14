<template>
  <div class="register">
    <h1>注册</h1>
    <van-form @submit="handleRegister" validate-trigger="onSubmit" :validate-first="true" ref="formRef">
      <van-cell-group inset>
        <van-field
          v-model="userModel.username"
          type="text"
          name="用户名"
          label="用户名"
          :rules="usernameRules"
          placeholder="请输入您的用户名"
          autocomplete="true"
          @keyup.enter="handleRegister"
        />
        <van-field
          v-model="userModel.phone"
          type="tel"
          name="手机号"
          label="手机号"
          :rules="phoneRules"
          placeholder="请输入您的手机号"
          autocomplete="true"
          @keyup.enter="handleRegister"
        />
        <van-field
          v-model="userModel.email"
          type="text"
          name="邮箱"
          label="邮箱"
          :rules="emailRules"
          placeholder="请输入您的邮箱"
          autocomplete="true"
          @keyup.enter="handleRegister"
        />
        <van-field v-model="code" center clearable label="验证码" placeholder="请输入邮箱验证码">
          <template #button>
            <van-button size="small" type="primary" class="code-btn" @click="handleCode(5)" :disabled="!codeBtnState">
              {{ codeBtnMsg }}
            </van-button>
          </template>
        </van-field>
        <van-field
          v-model="userModel.password"
          type="password"
          name="密码"
          label="密码"
          :rules="passwordRules"
          placeholder="请输入您的密码"
          autocomplete="true"
          @keyup.enter="handleRegister"
        />
        <van-field
          v-model="userModel.passwordAgain"
          type="password"
          name="确认密码"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { useUser } from '../../composables/useUser';
import { getCode, register } from '../../api/user';

const router = useRouter();
const { userModel, usernameRules, phoneRules, emailRules, passwordRules, passwordAgainRules } = useUser();

// 进入注册页时，重置用户信息
userModel.value = {
  username: '',
  password: '',
  phone: '',
  email: '',
  avatar: ''
};

// 发送验证码
const formRef = ref();
const codeBtnState = ref(true);
const codeBtnMsg = ref('发送验证码');
const handleCode = async (time: number) => {
  try {
    await formRef.value.validate('邮箱');
    const { data: res } = await getCode(userModel.value.email);
    Toast(res.msg);
    codeBtnState.value = false;
    codeBtnMsg.value = `${time}秒后再试`;
    const timer = setInterval(() => {
      time--;
      codeBtnMsg.value = `${time}秒后再试`;
      if (!time) {
        clearInterval(timer);
        codeBtnState.value = true;
        codeBtnMsg.value = `发送验证码`;
      }
    }, 1000);
  } catch {}
};

// 注册
const code = ref();
const handleRegister = async () => {
  try {
    const { data: res } = await register(
      userModel.value.username,
      userModel.value.phone,
      userModel.value.email,
      userModel.value.password,
      code.value
    );

    if (res.errno === 0) {
      Toast('注册成功');
      router.push('/login');
    } else {
      Toast(res.msg);
    }
  } catch (err) {
    Toast(err);
  }
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

  .code-btn {
    height: 24px;
    vertical-align: bottom;
  }

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
