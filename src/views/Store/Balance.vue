<template>
  <div class="wallet">
    <div class="wallet__balance">
      <i class="iconfont">&#xe7ce;</i>
      <h2>
        余额:
        <span>{{ balance }}</span>
        元
      </h2>
    </div>

    <div class="wallet__charge">
      <h2>充值金额(元)</h2>
      <input type="number" v-model="rechargeNum" @keyup.enter="handleRecharge" />
      <ul>
        <li @click="rechargeNum = 10">充10元</li>
        <li @click="rechargeNum = 20">充20元</li>
        <li @click="rechargeNum = 50">充50元</li>
        <li @click="rechargeNum = 100">充100元</li>
      </ul>
      <van-button type="primary" round class="wallet__charge__btn" @click="handleRecharge">充 值</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBalance } from '../../composables/useBalance';

const { balance, rechargeNum, handleBalance, handleRecharge } = useBalance();
handleBalance();
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/mixins.less';
.wallet {
  // padding: 0 10px;

  &__balance {
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    margin-top: 10px;
    padding: 0 30px;
    background: @cardBgColor;
    // .shadow;
    // .card;

    i {
      font-size: 70px;
      color: @themeColor;
    }

    h2 {
      font-weight: 700;
      font-size: 20px;
      height: 20px;
      span {
        color: @priceColor;
        font-weight: 600;
      }
    }
  }

  &__charge {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 230px;
    width: 100%;
    background: @cardBgColor;
    margin: 10px 0 0 0;
    padding: 10px 24px;
    // .shadow;
    // .card;

    h2 {
      font-size: 20px;
      font-weight: 700;
    }

    input {
      font-size: 14px;
      width: 160px;
      height: 32px;
      padding-left: 8px;
      border: 1px solid @borderColor;
      border-radius: 4px;
      outline: none;
    }

    ul {
      display: flex;
      justify-content: space-between;
    }

    ul li {
      font-size: 14px;
      height: 40px;
      width: 64px;
      border: 1px solid @borderColor;
      border-radius: 4px;
      line-height: 40px;
      text-align: center;
    }

    &__btn {
      width: 100%;
    }
  }
}
</style>
