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
import { useRouter } from 'vue-router';
import { exchange } from '../../api/store';
import { useBalance } from '../../composables/useBalance';
import { IGood } from '../../types';
import { Toast } from 'vant';

defineProps({
  item: {
    type: Object as PropType<IGood>,
    required: true
  }
});

const router = useRouter();
const { handleBalance } = useBalance();
// 兑换商品
const handleExchange = async (_id: string) => {
  const { data: res } = await exchange(_id);
  if (res.errno === 0) {
    Toast(res.msg);
    handleBalance();
  }
  res.msg === '兑换成功' && router.push({ name: 'Order' });
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
