<template>
  <div class="main">
    <header-tab>
      <span class="swap_1 page_on">商城</span>
    </header-tab>
    <section>
      <!-- 钱包部分 -->
      <div class="wallet">
        <div class="blance">
          <img src="/src/assets/wallet.png" alt />
          <div class="blance_sub">
            <h2>
              余额：
              <span class="user_blance">{{ balance }}</span> 元
            </h2>
          </div>
        </div>

        <div class="charge">
          <h2>充值金额(元)</h2>
          <input type="number" class="charge_input" v-model="chargeNum" @keyup.enter="charge" />
          <ul>
            <li class="charge10" @click="chargeNum = 10">充10元</li>
            <li class="charge20" @click="chargeNum = 20">充20元</li>
            <li class="charge50" @click="chargeNum = 50">充50元</li>
            <li class="charge100" @click="chargeNum = 100">充100元</li>
          </ul>
          <div class="charge_button" @click="charge">充 值</div>
        </div>
      </div>

      <!-- 商城部分 -->
      <div class="goods_list">
        <!-- 从后台获取商品信息 -->
        <!-- 通过change事件来更新余额 -->
        <good v-for="(item, index) in goodsList" :key="item.id" :item="item" :balance="balance" @change="getBalance()"></good>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import HeaderTab from '../components/Tab/HeaderTab.vue';
import Good from '../components/Good.vue';
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';

export default defineComponent({
  name: 'Store',
  components: {
    HeaderTab,
    Good
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const goodsList = ref([]);

    // 充值功能
    const balance = ref(0);
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
    const getBalance = () => {
      proxy?.$http
        .get('/store', {
          headers: { token: localStorage.getItem('token') }
        })
        .then((res) => (balance.value = res.data));
    };
    getBalance();

    // 获取商品列表
    const getGoodsList = () => {
      proxy?.$http
        .get('/goodAdd', {
          headers: { token: localStorage.getItem('token') }
        })
        .then((res) => (goodsList.value = res.data));
    };
    getGoodsList();

    return {
      balance,
      chargeNum,
      goodsList,
      charge,
      getBalance
    };
  }
});
</script>

<style scoped>
/* 商品列表 */
.goods_list {
  height: auto;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

/* 钱包部分 */
.wallet {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.blance {
  height: 8rem;
  width: 100%;
  margin: 1rem 0 0 0;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 2%;
  box-sizing: border-box;
  padding: 4%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: #666 0px 0px 3px;
}

.blance img {
  width: 6rem;
  height: 6rem;
}

.blance_sub {
  position: relative;
  left: -1rem;
}

.blance_sub h2 {
  font-weight: 700;
  font-size: 1.3rem;
  height: 1.3em;
}

.blance_sub span {
  position: relative;
  color: red;
  font-weight: 700;
}

.charge {
  height: 16rem;
  width: 100%;
  margin: 1rem 0 0 0;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 2%;
  box-sizing: border-box;
  padding: 4%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: #666 0px 0px 3px;
  /* align-items: center; */
}

.charge h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

.charge input {
  width: 10rem;
  height: 2rem;
  padding-left: 0.5em;
  border: 1px solid #666;
  border-radius: 0.2rem;
  outline: none;
}

ul {
  display: flex;
  justify-content: space-between;
}

ul li {
  height: 2.5rem;
  width: 4rem;
  border: 1px solid #666;
  border-radius: 0.2rem;
  line-height: 2.5rem;
  text-align: center;
  color: black;
}

.charge_button {
  width: 100%;
  background-color: #950040;
  height: 2.5rem;
  color: #fff;
  text-align: center;
  line-height: 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 0.2rem;
}

.swap_1 {
  border-radius: 1rem !important;
  width: 12rem !important;
}

.main {
  margin-bottom: 5rem;
}
</style>
