<template>
  <router-link :to="{ name: 'Detail', params: { id: item._id } }">
    <div class="task-content">
      <h2>{{ item.title }}</h2>
      <p class="task-content__detail">
        {{ item.content }}
      </p>
      <ul class="task-content__sub">
        <li class="task-content__sub__time">{{ time }}</li>
        <li class="task-content__sub__status">状态：{{ status }}</li>
        <li class="task-content__sub__price">&yen; {{ item.price }}</li>
      </ul>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatTime } from '../utils/formatTime';

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
    required: true
  }
});

// 格式化时间
const time = computed(() => {
  return formatTime(props.item.createdAt);
});

const statusId: number = props.item.status;
enum statusType {
  未接单,
  已接单,
  已完成
}
// 动态渲染任务状态
const status = statusType[statusId];
</script>

<style lang="less" scoped>
@import '../style/variables.less';
@import '../style/mixins.less';
.task-content {
  position: relative;
  height: 140px;
  width: 100%;
  margin-top: 10px;
  padding: 16px 16px 0;
  background: @cardBgColor;
  box-sizing: border-box;
  // .card;

  h2 {
    color: #333;
    font-size: 16px;
    font-weight: 700;
    .ellipsis;
  }

  &__detail {
    margin-top: 10px;
    // 多行文字隐藏
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__sub {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 10px;
    display: flex;
    justify-content: space-between;
    height: 18px;
    line-height: 18px;

    &__price {
      // 防止价格长短不一 导致时间与状态位置偏移
      width: 60px;
      text-align: right;
      color: @priceColor;
    }
  }
}
</style>
