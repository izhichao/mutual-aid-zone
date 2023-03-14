import { ref } from 'vue';
import { getBalance } from '../api/store';

const balance = ref(0);
export const useBalance = () => {
  const handleBalance = async () => {
    const { data: res } = await getBalance();
    balance.value = res.data.balance;
  };

  return { balance, handleBalance };
};
