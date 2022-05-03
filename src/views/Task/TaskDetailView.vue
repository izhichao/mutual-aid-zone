<template>
  <van-nav-bar title="任务详情" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="task-content">
      <h2>帮我拿一万个快递</h2>
      <p class="task-content__time">发布时间：2022/01/10 22:28</p>

      <p class="task-content__detail">快递在菜鸟驿站100-10-10000~100-10-20000的快递架上</p>
      <p class="task-content__price">&yen; 99.99</p>

      <div class="task-content__imgs">
        <van-image fit="cover" src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <van-image fit="cover" src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <van-image fit="cover" src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <van-image fit="cover" src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      </div>

      <van-steps>
        <van-step>未接单</van-step>
        <van-step>已接单</van-step>
        <van-step>任务完成</van-step>
      </van-steps>
    </div>

    <!-- <van-button round block type="primary">接 受</van-button> -->
    <!-- <van-button round block type="danger">删 除</van-button> -->
    <!-- <van-button round block type="warning">放 弃</van-button> -->
  </div>
</template>

<script lang="ts" setup>
const handleBack = () => history.back();
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
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;

    .van-image {
      width: 100px;
      height: 100px;
      margin-bottom: 5px;
    }
  }
}
</style>
