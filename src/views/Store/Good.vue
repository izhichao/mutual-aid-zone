<template>
  <div class="good">
    <img :src="item.img" alt="" />
    <div class="good__introduce">
      <h2>{{ item.name }}</h2>
      <span class="good__introduce__price">&yen; {{ item.price }}</span>
    </div>
    <van-button type="primary" round class="good__exchange" @click="handleExchange(item._id)">兑 换</van-button>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Toast } from 'vant';
import { useBalance } from '../../composables/useBalance';
import { exchange, getBalance } from '../../api/store';

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

const { handleBalance } = useBalance();

const handleExchange = async (_id: string) => {
  const { data: res } = await exchange(_id);
  if (res.errno === 0) {
    Toast(res.msg);
    handleBalance();
  }
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
