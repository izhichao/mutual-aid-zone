<template>
  <div class="task-content">
    <h2>{{ item.title }}</h2>
    <p class="task-content__detail">
      {{ item.content }}
    </p>
    <ul class="task-content__sub">
      <li class="task-content__sub__time">2022/01/10 22:28</li>
      <li class="task-content__sub__status">状态：已接受</li>
      <li class="task-content__sub__price">&yen; 99.99</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, computed, defineComponent, getCurrentInstance, PropType } from 'vue';
import { useRouter } from 'vue-router';

// 声明Task接口，并导出给TaskView、Store使用
export interface TaskProps {
  id: number;
  title: string;
  content: string;
  type: string;
  price: number;
  task_setter: string;
  task_getter: string;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: 'TaskItem',
  // item用于接受每一条任务的数据
  // type用于区分 所有任务、我的任务、我发布的
  props: {
    item: {
      type: Object as PropType<TaskProps>,
      default: () => {},
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  emits: ['change'],
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const router = useRouter();

    // 按钮的点击事件——实现任务的接受、删除、放弃
    const btnMethods = () => {
      proxy?.$http
        .get(
          '/taskEdit',
          // type=0代表接受任务
          // type=1代表放弃任务
          // type=2代表删除任务
          {
            params: { id: props.item.id, type: props.type },
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(() => {
          if (props.type === 0) {
            alert('接受成功');
            router.push('/task');
          } else if (props.type === 1) {
            alert('放弃成功');
            router.go(0);
          } else {
            alert('删除成功');
            router.go(0);
          }
        });
    };

    // 后端传回的英文类型转换为中文
    const taskType = computed(() => {
      switch (props.item.type) {
        case 'express':
          return '拿快递';
        case 'borrow':
          return '借东西';
        case 'sale':
          return '卖二手';
        case 'study':
          return '一起学习';
      }
    });

    // 将后端传回的时间进行格式化
    const time = computed(() => {
      let date = new Date(props.item.createdAt);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      return `${month}月${day}日 ${hour}:${minute}`;
    });

    // 将任务类型存储到typeId,再使用type枚举类型进行转换为中文
    const typeId: number = props.type;
    enum type {
      接受,
      放弃,
      删除
    }
    // 动态渲染按钮类型
    const btnType = type[typeId];

    return {
      btnMethods,
      taskType,
      time,
      btnType
    };
  }
});
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/mixins.less';
.task-content {
  position: relative;
  height: 140px;
  width: 100%;
  margin-top: 10px;
  padding: 16px 16px 0;
  background-color: #fff;
  box-sizing: border-box;
  // .card;

  h2 {
    color: #333;
    font-size: 16px;
    font-weight: 500;
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
