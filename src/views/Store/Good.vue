<template>
  <div class="good">
    <img :src="item.img" alt="" />
    <div class="good__introduce">
      <h2>{{ item.name }}</h2>
      <span class="good__introduce__price">&yen; {{ item.price }}</span>
    </div>
    <van-button type="primary" round class="good__exchange" @click="exchange">兑 换</van-button>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance, PropType } from 'vue';
import { Toast } from 'vant';
import { useBalance } from '../../composables/useBalance';

// 声明Good接口，并导出给StoreView使用
export interface GoodProps {
  _id: string;
  name: string;
  price: number;
  img: string;
}

const props = defineProps({
  item: {
    type: Object as PropType<GoodProps>,
    default: () => {},
    required: true
  }
});

const { balance } = useBalance();

const emits = defineEmits(['change']);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const exchange = () => {
  // 判断余额是否足够
  if (balance.value <= props.item.price) {
    Toast('余额不足,请充值！');
    return;
  }
  // 发送请求进行兑换
  proxy?.$http
    .get('/storeExchange', {
      params: { price: props.item.price },
      headers: { token: localStorage.getItem('token') }
    })
    .then(() => {
      Toast('兑换成功');
      // 兑换成功后使用自定义事件通知父组件
      emits('change');
    });
};
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/mixins.less';
.good {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  margin: 8px 0 0 0;
  background: @cardBgColor;
  padding: 0 20px;
  box-sizing: border-box;
  // .shadow;
  // .card;

  img {
    width: 60px;
    height: 60px;
  }

  &__introduce {
    width: 150px;

    h2 {
      font-weight: 700;
      font-size: 18px;
      width: 100%;
      .ellipsis;
    }

    span {
      color: @themeColor;
      color: @priceColor;
      font-weight: 700;
      font-size: 18px;
    }
  }

  &__exchange {
    width: auto;
    height: 32px;
  }
}
</style>
