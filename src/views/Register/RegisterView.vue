<template>
  <div class="register">
    <h1>注册</h1>
    <div class="register__phone">
      <i class="iconfont">&#xe74c;</i>
      <input type="text" name="username" placeholder="请输入您的用户名" v-model.lazy="username" @keyup.enter="register" />
    </div>
    <div class="register__password">
      <i class="iconfont">&#xe736;</i>
      <input type="password" name="password" placeholder="请输入您的密码" v-model.lazy="password" @keyup.enter="register" />
    </div>
    <input type="button" class="register__registerBtn" value="注 册" @click="register" />
    <router-link to="login" class="register__login">立即登录</router-link>
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
.register {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
      font-size: (16vw / 3.75);
      width: (160vw / 3.75);
      height: (32vw / 3.75);
      padding: 0 (8vw / 3.75);
      outline: none;
      border: 1px solid #d9d9d6;
    }
  }

  &__registerBtn {
    font-size: (16vw / 3.75);
    margin-top: (20vw / 3.75);
    height: (40vw / 3.75);
    width: (192vw / 3.75);
    outline: none;
    color: #fff;
    background-color: #950040;
  }

  &__login {
    font-size: (16vw / 3.75);
    margin-top: (15vw / 3.75);
    color: rgb(112, 112, 112);
  }
}
</style>
