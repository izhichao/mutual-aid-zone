import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { login } from '../api/user';

const user = {
  _id: '',
  username: '',
  img: ''
};

export const useLogin = () => {
  const router = useRouter();
  const loginModel = reactive({
    username: '',
    password: ''
  });

  const usernameRules = [{ pattern: /^[a-zA-Z0-9_!]{2,12}$/, message: '用户名长度为2-12位' }];
  const passwordRules = [{ pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度为6-16位' }];

  const handleLogin = async () => {
    try {
      const { data: res } = await login(loginModel.username, loginModel.password);

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

  const { username, password } = toRefs(loginModel);

  return { username, password, usernameRules, passwordRules, handleLogin, user };
};
