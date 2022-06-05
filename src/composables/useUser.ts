import { StorageSerializers, useStorage } from '@vueuse/core';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { changePassword, editUser, getUser, login, register } from '../api/user';

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
  const usernameRules = [{ pattern: /^[a-zA-Z0-9_!]{2,12}$/, message: '用户名长度为2-12位' }];
  const passwordRules = [{ pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度为6-16位' }];
  const phoneRules = [{ pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号' }];
  const emailRules = [
    { pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, message: '请输入正确的邮箱' }
  ];
  const passwordAgainRules = [{ validator: () => userModel.value.password === userModel.value.passwordAgain, message: '两次密码不一致' }];

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

  const handleRegister = async () => {
    try {
      const { data: res } = await register(userModel.value.username, userModel.value.phone, userModel.value.email, userModel.value.password);

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

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('username', userModel.value.username);
    formData.append('phone', userModel.value.phone);
    formData.append('email', userModel.value.email);
    userModel.value.address && formData.append('address', userModel.value.address);
    userModel.value.avatarFile && userModel.value.avatarFile.length !== 0 && formData.append('avatar', userModel.value.avatarFile[0].file);
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
    usernameRules,
    phoneRules,
    emailRules,
    passwordRules,
    passwordAgainRules,
    handleLogin,
    handleRegister,
    handlePassword,
    handleEdit,
    handleLogout
  };
};
