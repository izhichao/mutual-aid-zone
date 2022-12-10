import { StorageSerializers, useStorage } from '@vueuse/core';
import { Toast } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCode, changePassword, editUser, forgetPassword, getUser, login, register } from '../api/user';

const userModel = useStorage(
  'user',
  {
    username: '',
    oldPassword: '',
    password: '',
    passwordAgain: '',
    phone: '',
    email: '',
    address: '',
    avatar: '',
    avatarFile: []
  },
  undefined,
  {
    serializer: StorageSerializers.object
  }
);

export const handleDetail = async () => {
  try {
    const { data: res } = await getUser();
    res.data.password = '';
    userModel.value = res.data;
  } catch (err) {
    localStorage.removeItem('token');
    userModel.value = {
      username: '',
      phone: '',
      avatar: ''
    };
    location.reload();
  }
};

export const useUser = () => {
  const router = useRouter();

  // 表单校验规则
  const usernameRules = [
    {
      validator: (val: string) => {
        if (val.length > 12) {
          return '用户名不能大于12位';
        } else if (val.length < 2) {
          return '用户名不能少于2位';
        }
      }
    }
  ];
  const passwordRules = [{ pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度为6-16位' }];
  const phoneRules = [
    {
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '请输入正确的手机号'
    }
  ];
  const emailRules = [
    {
      pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
      message: '请输入正确的邮箱'
    }
  ];
  const passwordAgainRules = [
    { validator: () => userModel.value.password === userModel.value.passwordAgain, message: '两次密码不一致' }
  ];

  const handleLogin = async () => {
    try {
      const { data: res } = await login(userModel.value.username, userModel.value.password);

      if (res.errno === 0) {
        Toast('登录成功');
        localStorage.setItem('token', res.data.token);
        router.push('/');
      } else {
        Toast(res.msg);
      }
    } catch (err) {
      Toast(err);
    }
  };

  const registerFormRef = ref();
  const codeBtnState = ref(true);
  const codeBtnMsg = ref('发送验证码');
  const handleCode = async (time: number) => {
    try {
      await registerFormRef.value.validate('邮箱');
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

  const code = ref();
  const handleRegister = async () => {
    try {
      const { data: res } = await register(
        userModel.value.username,
        userModel.value.phone,
        userModel.value.email,
        userModel.value.password
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

  const handlePassword = async () => {
    const { data: res } = await changePassword(userModel.value.oldPassword, userModel.value.password);
    Toast(res.msg);
  };

  const emailForget = ref();
  const handleForgetPassword = async () => {
    const { data: res } = await forgetPassword(emailForget.value);
    Toast(res.msg);
  };

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('username', userModel.value.username);
    formData.append('phone', userModel.value.phone);
    formData.append('email', userModel.value.email);
    userModel.value.address && formData.append('address', userModel.value.address);
    userModel.value.avatarFile &&
      userModel.value.avatarFile.length !== 0 &&
      formData.append('avatar', userModel.value.avatarFile[0].file);
    const { data: res } = await editUser(formData);
    Toast(res.msg);
    router.go(0);
  };

  const handleLogout = () => {
    Toast('注销成功');
    userModel.value = {
      username: '',
      phone: '',
      avatar: ''
    };
    localStorage.removeItem('token');
    router.push({ name: 'Home' });
  };

  return {
    userModel,
    emailForget,
    code,
    codeBtnMsg,
    codeBtnState,
    registerFormRef,
    usernameRules,
    phoneRules,
    emailRules,
    passwordRules,
    passwordAgainRules,
    handleLogin,
    handleRegister,
    handleCode,
    handlePassword,
    handleForgetPassword,
    handleEdit,
    handleLogout
  };
};
