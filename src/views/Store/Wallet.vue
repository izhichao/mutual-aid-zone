<template>
  <div class="wallet">
    <div class="wallet__balance">
      <i class="iconfont">&#xe7ce;</i>
      <h2>
        余额：
        <span>{{ balance }}</span>
        元
      </h2>
    </div>

    <div class="wallet__charge">
      <h2>充值金额(元)</h2>
      <input type="number" v-model="chargeNum" @keyup.enter="charge" />
      <ul>
        <li @click="chargeNum = 10">充10元</li>
        <li @click="chargeNum = 20">充20元</li>
        <li @click="chargeNum = 50">充50元</li>
        <li @click="chargeNum = 100">充100元</li>
      </ul>
      <div class="button" @click="charge">充 值</div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';
import { mainStore } from '../../store';
export default defineComponent({
  name: 'Wallet',
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = mainStore();
    // 充值功能
    const { balance } = storeToRefs(store);
    const chargeNum = ref<number>();
    const charge = () => {
      proxy?.$http.post('/store', { charge: chargeNum.value }, { headers: { token: localStorage.getItem('token') } }).then((res) => {
        alert('充值成功');
        // 将新的余额赋值给balance
        balance.value = res.data.balance;
        
      });
      // 将输入框中的内容清空
      chargeNum.value = undefined;
    };

    // 获取余额
    store.getBalance();

    return {
      balance,
      chargeNum,
      charge
    };
  }
});
</script>

<style lang="less" scoped>
.wallet {
  padding: 0 (10vw / 3.75);

  &__balance {
    height: (128vw / 3.75);
    margin-top: (6vw / 3.75);
    background-color: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 2%;
    box-sizing: border-box;
    padding: 4%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: #666 0px 0px 3px;

    i {
      font-size: (70vw / 3.75);
      color: #950040;
    }

    h2 {
      font-weight: 700;
      font-size: (20.8vw / 3.75);
      height: (20.8vw / 3.75);
      span {
        color: red;
        font-weight: 700;
      }
    }
  }

  &__charge {
    height: (256vw / 3.75);
    width: 100%;
    margin: (10vw / 3.75) 0 0 0;
    background-color: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 2%;
    box-sizing: border-box;
    padding: 4%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-shadow: #666 0px 0px 3px;

    h2 {

      font-size: (24vw / 3.75);
      font-weight: 700;
    }

    input {
      font-size: (14vw / 3.75);
      width: (160vw / 3.75);
      height: (32vw / 3.75);
      padding-left: (8vw / 3.75);
      border: 1px solid #666;
      border-radius: (3.2vw / 3.75);
      outline: none;
    }

    ul {
      display: flex;
      justify-content: space-between;
    }

    ul li {
      font-size: (14vw / 3.75);
      height: (40vw / 3.75);
      width: (64vw / 3.75);
      border: 1px solid #666;
      border-radius: (3.2vw / 3.75);
      line-height: (40vw / 3.75);
      text-align: center;
      color: #666;
    }

    .button {
      width: 100%;
    }
  }
}
</style>
