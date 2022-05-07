import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { login } from '../api/user';

export const useLogin = () => {
  const router = useRouter();
  const loginModel = reactive({
    username: '',
    password: ''
  });

  const usernameRules = [{ pattern: /^[a-zA-Z0-9_!]{4,12}$/, message: '用户名长度为4-12位' }];
  const passwordRules = [{ pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度为6-16位' }];

  const handleLogin = async () => {
    const { data: res } = await login(loginModel.username, loginModel.password);

    if (res.errno === 0) {
      Toast('登录成功');
      localStorage.setItem('token', res.token);
      router.push('/');
    } else {
      Toast('登录失败');
      loginModel.username = '';
      loginModel.password = '';
    }
  };

  const { username, password } = toRefs(loginModel);

  return { username, password, usernameRules, passwordRules, handleLogin };
};
