import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { register } from '../api/user';

const router = useRouter();

export const useRegister = () => {
  const registerModel = reactive({
    username: '',
    phone: '',
    email: '',
    password: '',
    passwordAgain: ''
  });

  const usernameRules = [{ pattern: /^[a-zA-Z0-9_!]{4,12}$/, message: '用户名长度为4-12位' }];

  const phoneRules = [{ pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号' }];

  const emailRules = [
    { pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, message: '请输入正确的邮箱' }
  ];

  const passwordRules = [{ pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度为6-16位' }];

  const passwordAgainRules = [
    {
      validator: () => registerModel.password === registerModel.passwordAgain,
      message: '两次密码不一致'
    }
  ];

  const handleRegister = async () => {
    if (registerModel.username === '' || registerModel.password === '') return Toast('用户名或密码不能为空');
    const { data: res } = await register(registerModel.username, registerModel.phone, registerModel.email, registerModel.password);

    if (res.errno === 0) {
      Toast('注册成功');
      router.push('/login');
    }
  };

  const { username, phone, email, password, passwordAgain } = toRefs(registerModel);

  return {
    username,
    phone,
    email,
    password,
    passwordAgain,
    usernameRules,
    phoneRules,
    emailRules,
    passwordRules,
    passwordAgainRules,
    handleRegister
  };
};