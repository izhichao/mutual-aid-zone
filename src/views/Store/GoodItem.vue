<template>
  <div class="good">
    <img :src="item.img_url" alt="" />
    <div class="good__introduce">
      <h2>{{ item.name }}</h2>
      <span class="good__introduce__price">￥ {{ item.price }}</span>
    </div>
    <div class="good__exchange" @click="exchange">兑 换</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance, PropType } from 'vue';

// 声明Good接口，并导出给StoreView使用
export interface GoodProps {
  id: number;
  name: string;
  price: number;
  img_url: string;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: 'GoodItem',
  props: {
    item: {
      type: Object as PropType<GoodProps>,
      default: () => {},
      required: true
    },
    balance: {
      type: Number,
      required: true
    }
  },
  emits: ['change'],
  setup(props, content) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const exchange = () => {
      // 判断余额是否足够
      if (props.balance <= props.item.price) {
        alert('余额不足,请充值！');
        return;
      }
      // 发送请求进行兑换
      proxy?.$http
        .get('/storeExchange', {
          params: { price: props.item.price },
          headers: { token: localStorage.getItem('token') }
        })
        .then(() => {
          alert('兑换成功');
          // 兑换成功后使用自定义事件通知父组件
          content.emit('change');
        });
    };
    return {
      exchange
    };
  }
});
</script>

<style lang="less" scoped>
.good {
  height: (128vw / 3.75);
  width: 100%;
  margin: (16vw / 3.75) 0 0 0;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 2%;
  padding: 4%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: #666 0px 0px 3px;

  img {
    width: (96vw / 3.75);
    height: (96vw / 3.75);
  }

  &__introduce {
    width: (152vw / 3.75);

    h2 {
      font-weight: 700;
      font-size: (19.2vw / 3.75);
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    span {
      color: red;
      font-weight: 700;
      font-size: (19.2vw / 3.75);
    }
  }

  &__exchange {
    background-color: #950040;
    color: #fff;
    font-weight: 700;
    font-size: (14vw / 3.75);
    width: (64vw / 3.75);
    height: (32vw / 3.75);
    line-height: (32vw / 3.75);
    text-align: center;
    border-radius: (16vw / 3.75);
  }
}
</style>
