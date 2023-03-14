import { StorageSerializers, useStorage } from '@vueuse/core';
import { getUser } from '../api/user';

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

export const useUser = () => {
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

  // 获取用户信息
  const handleDetail = async () => {
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

  return {
    userModel,
    usernameRules,
    phoneRules,
    emailRules,
    passwordRules,
    passwordAgainRules,
    handleDetail
  };
};
