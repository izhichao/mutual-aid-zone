import { Toast } from 'vant';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { changePassword, editUser, getUserDetail, login, register } from '../api/user';

const user = {
  _id: '',
  username: '',
  img: ''
};

export const useUser = () => {
  const router = useRouter();

  const userModel = ref({
    username: '',
    oldPassword: '',
    password: '',
    passwordAgain: '',
    phone: '',
    email: '',
    address: '',
    avatar: '',
    avatarFile: []
  });

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
        user._id = res.data._id;
        user.username = res.data.username;
        user.img = res.data.img;
        localStorage.setItem('token', res.token);
        router.push('/');
      } else {
        Toast('登录失败');
      }
    } catch {
      Toast('网络异常');
    }
  };

  const handleRegister = async () => {
    try {
      const { data: res } = await register(userModel.value.username, userModel.value.phone, userModel.value.email, userModel.value.password);

      if (res.errno === 0) {
        Toast('注册成功');
        router.push('/login');
      } else {
        Toast('注册失败');
      }
    } catch {
      Toast('网络异常');
    }
  };

  const handlePassword = async () => {
    const { data: res } = await changePassword(userModel.value.password);
    Toast.success(res.msg);
  };

  const handleDetail = async () => {
    const { data: res } = await getUserDetail();
    userModel.value = res.data;
  };

  const handleEdit = () => {
    const formData = new FormData();
    formData.append('username', userModel.value.username);
    formData.append('phone', userModel.value.phone);
    formData.append('email', userModel.value.email);
    userModel.value.address && formData.append('address', userModel.value.address);
    userModel.value.avatarFile && formData.append('avatar', userModel.value.avatarFile[0].file);
    editUser(formData);
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
    handleDetail,
    handleEdit
  };
};
