import { defineStore } from 'pinia';
import axios from 'axios';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      balance: 0
    };
  },
  actions: {
    getBalance() {
      axios
        .get('/store', {
          headers: { token: localStorage.getItem('token') }
        })
        .then((res) => {
          this.balance = res.data;
        });
    }
  }
});
