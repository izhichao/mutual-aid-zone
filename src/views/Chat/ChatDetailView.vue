<template>
  <van-nav-bar title="只抄" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="content">
      <div class="content__box">
        <div class="content__img content__left">
          <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" />
        </div>
        <div class="content__text">
          你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！你好呀！
        </div>
      </div>

      <div class="content__box me">
        <div class="content__text content__left">你好呀！你好呀！</div>
        <div class="content__img">
          <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="send">
    <div class="send__box">
      <input type="text" />
    </div>
    <van-button class="send__btn" type="primary" size="small" round>发送</van-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const handleBack = () => history.back();
</script>

<style lang="less" scoped>
.content {
  padding: 0 10px 10px;

  &__box {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  &__img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__left {
    margin-right: 10px;
  }
}

.me {
  justify-content: end;
}

.send {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 50px;
  padding: 10px 20px;
  border-top: 1px solid #ccc;
  background-color: #fff;

  &__box {
    flex: 1;
    height: 30px;
    margin-right: 15px;

    input {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0 15px;
      border-radius: 15px;
      background-color: #eeeff4;
      outline: none;
      border: none;
    }
  }

  &__btn {
    height: 30px;
    width: 50px;
  }
}
</style>
