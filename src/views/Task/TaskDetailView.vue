<template>
  <van-nav-bar title="任务详情" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="task-content">
      <h2>{{ taskModel.title }}</h2>
      <p class="task-content__time">发布时间：{{ taskModel.createdAt }}</p>
      <p class="task-content__setter">
        发布人：{{ taskModel.setter.username }}
        <router-link
          :to="{ name: 'ChatDetail', params: { id: taskModel.setter._id || ' '  } }"
          v-if="taskModel.setter._id !== userModel._id"
        >
          去私聊
        </router-link>
      </p>
      <p class="task-content__getter" v-if="taskModel.status !== 0">接收人：{{ taskModel.getter?.username }}</p>

      <p class="task-content__detail">{{ taskModel.content }}</p>
      <p class="task-content__price">&yen; {{ taskModel.price }}</p>

      <div class="task-content__imgs">
        <van-image
          fit="cover"
          v-for="(item, index) in taskModel.imgs"
          :key="item"
          :src="item"
          @click="handleImagePreview(index)"
        />
      </div>

      <van-steps :active="taskModel.status">
        <van-step>未接单</van-step>
        <van-step>已接单</van-step>
        <van-step>已完成</van-step>
      </van-steps>
    </div>

    <div class="btns" v-if="btnStatus.publish">
      <van-button round block type="danger" @click="handleDelete">删 除</van-button>
      <van-button round block type="primary" @click="handlePushEdit">编 辑</van-button>
    </div>
    <div class="btns" v-if="btnStatus.accept">
      <van-button round block type="warning" @click="handleGiveup">放 弃</van-button>
      <van-button round block type="primary" @click="handleFinish">完 成</van-button>
    </div>
    <div class="btns" v-if="btnStatus.unaccept">
      <van-button round block type="primary" @click="handleAccept">接 受</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ImagePreview, Toast } from 'vant';
import { useTask } from '../../composables/useTask';
import { useUser } from '../../composables/useUser';
import { acceptTask, deleteTask, finishTask, giveupTask } from '../../api/task';
const route = useRoute();
const router = useRouter();
const { taskModel, handleDetail, handleBack } = useTask();
const { userModel } = useUser();

// 页面按钮操作
const handlePushEdit = () => {
  router.push({ name: 'Edit', params: { id: route.params.id } });
};
const handleDelete = () => {
  deleteTask(taskModel.value._id);
  Toast('删除成功');
  router.push({ name: 'Home' });
};
const handleGiveup = () => {
  giveupTask(taskModel.value._id);
  Toast('放弃成功');
  router.go(0);
};
const handleFinish = () => {
  finishTask(taskModel.value._id);
  Toast('任务完成');
  router.go(0);
};
const handleAccept = () => {
  acceptTask(taskModel.value._id);
  Toast('接受成功');
  router.go(0);
};

// 获取内容并根据用户设置按钮状态
const btnStatus = reactive({
  publish: false,
  unaccept: false,
  accept: false
});
handleDetail().then((taskModel) => {
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  if (taskModel.value.status === 2) return;
  if (taskModel.value.setter._id === userId) {
    btnStatus.publish = true; // 任务发布者
  } else if (taskModel.value.getter?._id === userId) {
    btnStatus.accept = true; // 任务接收者
  } else if (taskModel.value.status !== 1) {
    btnStatus.unaccept = true; // 任务未接单时，路人浏览
  }
});

// 动态渲染图片占位格子
const imgsRows = ref('');
const imgsLength = taskModel.value.imgs.length;
if (imgsLength > 0 && imgsLength <= 3) {
  imgsRows.value = '100px';
} else if (imgsLength > 3) {
  imgsRows.value = '100px 100px';
}

// 图片放大功能
const handleImagePreview = (pos: number) => {
  ImagePreview({
    images: taskModel.value.imgs,
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

.btns {
  display: flex;
  justify-content: center;

  .van-button {
    margin: 30px 15px;
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
  &__setter,&__getter {
    margin-top: 5px;

    a {
      color: @themeColor;
    }
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
    grid-template-rows: v-bind(imgsRows);
    gap: 5px;
    margin-top: 20px;

    .van-image {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
