<template>
  <van-nav-bar title="任务详情" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="task-content">
      <h2>{{ returnTaskModel.title }}</h2>
      <p class="task-content__time">发布时间：{{ returnTaskModel.createdAt }}</p>
      <p class="task-content__setter">发布人：{{ returnTaskModel.setter.username }}</p>

      <p class="task-content__detail">{{ returnTaskModel.content }}</p>
      <p class="task-content__price">&yen; {{ returnTaskModel.price }}</p>

      <div class="task-content__imgs">
        <van-image fit="cover" v-for="(item, index) in returnTaskModel.imgs" :key="item" :src="item" @click="handleImagePreview(index)" />
      </div>

      <van-steps :active="returnTaskModel.status">
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
    <van-button round block type="primary" v-if="btnStatus.unaccept" @click="handleAccept">接 受</van-button>
  </div>
</template>

<script lang="ts" setup>
import { ImagePreview } from 'vant';
import { ref } from 'vue';
import { useTask } from '../../composables/useTask';
const handleBack = () => history.back();
const { returnTaskModel, btnStatus, handleDelete, handlePushEdit, handleGiveup, handleFinish, handleAccept } = useTask();
// 动态渲染图片占位格子
const imgsRows = ref('');
const imgsLength = returnTaskModel.value.imgs.length;
if (imgsLength >0 && imgsLength <= 3) {
  imgsRows.value = '100px';
} else if (imgsLength > 3) {
  imgsRows.value = '100px 100px';
}
// 图片放大功能
const handleImagePreview = (pos: number) => {
  ImagePreview({
    images: returnTaskModel.value.imgs,
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
