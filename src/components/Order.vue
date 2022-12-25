<template>
  <div class="order">
    <div class="order__header">
      <div class="order__header__time">{{ formatTime(item.createdAt) }}</div>
      <div class="order__header__status">{{ statusType[item.status] }}</div>
    </div>
    <div class="order__content">
      <div class="order__content__img">
        <img :src="item.img" />
      </div>
      <div class="order__content__right">
        <h2 class="order__content__title bold">{{ item.good }}</h2>
        <div class="order__content__address">
          <span class="bold">收货地址</span>
          {{ item.address }}
        </div>
        <div class="order__content__id">
          <span class="bold">订单号</span>
          {{ item._id }}
        </div>
        <div class="order__content__express" v-if="item.express">
          <span class="bold">快递单号</span>
          {{ item.express }}
        </div>
      </div>
    </div>
    <div class="order__bottom">
      <span class="order__bottom__price">&yen;{{ item.price }}</span>
      <van-button size="small" v-if="item.status === 1" @click="handleFinish(item._id)">确认收货</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Toast } from 'vant';
import { PropType } from 'vue';
import { finishOrder } from '../api/order';
import { OrderType } from '../types/order';
import { formatTime } from '../utils/formatTime';
enum statusType {
  未发货,
  待收货,
  已完成
}

defineProps({
  item: {
    type: Object as PropType<OrderType>,
    required: true
  }
});

const handleFinish = async (_id: string) => {
  const { data: res } = await finishOrder(_id);
  Toast(res.msg);
};
</script>

<style lang="less" scoped>
@import '../style/variables.less';

.bold {
  font-weight: 700;
}
.order {
  padding: 15px 20px;
  margin-top: 10px;
  background-color: #fff;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    margin: 15px 0;

    &__img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &__right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__price {
      color: @priceColor;
      font-weight: 700;
      font-size: 18px;
    }

    button {
      text-align: right;
    }
  }
}
</style>
