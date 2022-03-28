<template>
  <div>
    <div class="task_content">
      <h2>{{ item.title }}</h2>
      <div class="task_detail">{{ item.content }}</div>
      <ul class="task_sub">
        <li class="task_phone">用户: {{ item.task_setter }}</li>
        <li class="price">出价: {{ item.price }}元</li>
        <li class="task_type">类型: {{ taskType }}</li>
      </ul>
      <ul class="task_sub">
        <li class="time">{{ time }}</li>
        <li class="task_id">任务号: {{ item.id }}号</li>
        <li class="btn" @click="btnMethods">{{ btnType }}</li>
      </ul>
    </div>
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
  name: 'TaskList',
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
.task_content {
  height: 12rem;
  width: 100%;
  margin: 1rem 0 0 0;
  background-color: #fff;
  border-radius: 2%;
  box-sizing: border-box;
  box-shadow: #666 0px 0px 3px;
  padding: 16px;
}

.task_content h2 {
  font-weight: 700;
  font-size: 1.3rem;
}

.task_detail {
  height: 4.5rem;
  margin: 0.5rem 0;
}

.task_sub {
  display: flex;
  justify-content: space-between;
}

.task_sub .abandon,
.task_sub .delete,
.task_sub .get {
  cursor: pointer;
  color: #950040;
}

.btn {
  color: #950040;
}
</style>
