<template>
  <div class="goods_content">
    <img :src="item.img_url" alt="" />
    <div class="introduce">
      <h2>{{ item.name }}</h2>
      <span class="price">￥ {{ item.price }}</span>
    </div>
    <div class="exchange" @click="exchange">兑 换</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance } from 'vue';

export default defineComponent({
  name: 'Good',
  props: ['item', 'balance'],
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

<style scoped>
.goods_content {
  height: 8rem;
  width: 100%;
  margin: 1rem 0 0 0;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 2%;
  box-sizing: border-box;
  padding: 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: #666 0px 0px 3px;
}

.goods_content img {
  width: 6rem;
  height: 6rem;
}

.introduce {
  position: relative;
  width: 9.5rem;
}

.introduce h2 {
  font-weight: 700;
  font-size: 1.3rem;
  height: 1.3em;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.introduce span {
  position: relative;
  color: red;
  font-weight: 700;
  font-size: 1.2rem;
}

.exchange {
  position: relative;
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #fff;
  font-weight: 700;
  border-radius: 1rem;
  background-color: #950040;
}
</style>
