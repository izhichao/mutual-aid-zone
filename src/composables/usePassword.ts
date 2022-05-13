import { reactive, toRefs } from "vue";
import { changePassword } from "../api/user";
import { Toast } from 'vant';

export const usePassword = () => {
  const passwordModel = reactive({
    oldPassword: '',
    password: '',
    passwordAgain: ''
  });

  const passwordRules = [{ pattern: /^[a-zA-Z0-9_!]{6,16}$/, message: '密码长度为6-16位' }];

  const passwordAgainRules = [
    {
      validator: () => passwordModel.password === passwordModel.passwordAgain,
      message: '两次密码不一致'
    }
  ];

  const handlePassword = async () => {
    const { data: res } = await changePassword(passwordModel.password);
    Toast.success(res.msg);
  };

  const { oldPassword, password, passwordAgain } = toRefs(passwordModel);

  return {
    oldPassword,
    password,
    passwordAgain,
    passwordRules,
    passwordAgainRules,
    handlePassword
  };
};