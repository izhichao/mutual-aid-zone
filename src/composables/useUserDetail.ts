import { ref } from 'vue';
import { getDetail } from '../api/user';

export const useUserDetail = () => {
  const userDetail = ref({
    username: '',
    phone: '',
    email: '',
    address: '',
    avatar: '',
    avatarFile: []
  });

  const handleDetail = async () => {
    const { data: res } = await getDetail();
    userDetail.value = res.data;
  };
  handleDetail();

  return { userDetail };
};
