<template>
  <div class="chat">
    <div class="chat__left">
      <div class="chat__img">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" />
      </div>
    </div>
    <div class="chat__right">
      <div class="chat__top">
        <div class="chat__name">只抄</div>
        <div class="chat__time">3月18日</div>
      </div>
      <div class="chat__content">
        为了更好的用户体验，我们将于3.18日凌晨对官网进行维护。为了更好的用户体验，我们将于3.18日凌晨对官网进行维护。
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.chat {
  margin-top: 1px;
  padding: 15px;
  background-color: #fff;
  display: flex;

  &:nth-child(1) {
    margin-top: 10px;
  }

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__img {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  &__name {
    font-size: 16px;
    color: #333;
  }

  &__time {
    font-size: 14px;
    line-height: 18px;
  }

  &__content {
    margin-top: 5px;
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
