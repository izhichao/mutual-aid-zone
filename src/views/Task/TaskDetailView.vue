<template>
  <van-nav-bar title="任务详情" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="task-content">
      <h2>{{ taskItem.title }}</h2>
      <p class="task-content__time">发布时间：{{ taskItem.created }}</p>
      <p class="task-content__setter">发布人：{{ taskItem.setter }}</p>

      <p class="task-content__detail">{{ taskItem.content }}</p>
      <p class="task-content__price">&yen; {{ taskItem.price }}</p>

      <div class="task-content__imgs">
        <van-image fit="cover" v-for="(item, index) in taskItem.imgs" :key="item" :src="item" @click="handleImagePreview(index)" />
      </div>

      <van-steps :active="taskItem.status">
        <van-step>未接单</van-step>
        <van-step>已接单</van-step>
        <van-step>已完成</van-step>
      </van-steps>
    </div>

    <div class="btns" v-if="btnStatus.publish">
      <van-button round block type="danger" @click="handleDelete">删 除</van-button>
      <van-button round block type="primary" @click="handleEdit">编 辑</van-button>
    </div>
    <div class="btns" v-if="btnStatus.accept">
      <van-button round block type="warning" @click="handleUnaccept">放 弃</van-button>
      <van-button round block type="primary" @click="handleFinish">完 成</van-button>
    </div>
    <van-button round block type="primary" v-if="btnStatus.unaccept" @click="handleAccept">接 受</van-button>
  </div>
</template>

<script lang="ts" setup>
import { ImagePreview } from 'vant';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getDetail } from '../../api/task';
import { formatTime } from '../../utils/formatTime';
const route = useRoute();
const handleBack = () => history.back();

const taskItem = ref({
  _id: '',
  title: '',
  content: '',
  price: 0,
  setter: '',
  getter: '',
  imgs: [],
  status: null,
  created: ''
});

const btnStatus = reactive({
  publish: false,
  unaccept: false,
  accept: false
});

const userId = '123456';

const handleDetail = async () => {
  const { data: res } = await getDetail(route.params.id as string);
  res.data.created = formatTime(res.data.created);
  taskItem.value = res.data;

  if (res.data.status === 2) {
    return;
  }

  if (res.data.setter === userId) {
    // 任务发布者
    btnStatus.publish = true;
  } else if (res.data.getter === userId) {
    // 任务接收者
    btnStatus.accept = true;
  } else if (res.data.status !== 1) {
    // 任务未接单时，路人浏览
    btnStatus.unaccept = true;
  }
};
handleDetail();

const useTaskButton = () => {
  const handleDelete = () => {
    // console.log('删除');
    console.log(taskItem.value._id);
  };
  const handleEdit = () => {
    console.log('编辑');
  };
  const handleUnaccept = () => {
    console.log('放弃');
  };
  const handleFinish = () => {
    console.log('完成');
  };
  const handleAccept = () => {
    console.log('接受');
  };

  return {
    handleDelete,
    handleEdit,
    handleUnaccept,
    handleFinish,
    handleAccept
  };
};

const { handleDelete, handleEdit, handleUnaccept, handleFinish, handleAccept } = useTaskButton();

// 图片放大功能
const handleImagePreview = (pos: number) => {
  ImagePreview({
    images: taskItem.value.imgs,
    startPosition: pos
  });
};
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/mixins.less';
.main-content {
  bottom: 0;
}

.van-button {
  margin: 30px auto;
}

.btns {
  display: flex;
  justify-content: center;

  .van-button {
    margin: 30px 10px;
  }
}

.task-content {
  position: relative;
  margin: 20px 16px 0;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  .shadow;

  h2 {
    color: #333;
    font-size: 20px;
    font-weight: 700;
    .ellipsis;
  }

  &__time {
    margin-top: 10px;
  }
  &__setter {
    margin-top: 5px;
  }

  &__detail {
    margin-top: 20px;
    font-size: 15px;
    color: @fontColor;
  }

  &__price {
    margin-top: 20px;
    font-size: 20px;
    color: @priceColor;
  }

  &__imgs {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px;
    gap: 5px;
    margin-top: 20px;

    .van-image {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
