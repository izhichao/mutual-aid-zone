<template>
  <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="order-list">
      <div class="order">
        <div class="order__header">
          <div class="order__header__time">2022年11月1日</div>
          <div class="order__header__status">待收货</div>
        </div>
        <div class="order__content">
          <div class="order__content__img">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" />
          </div>
          <div class="order__content__right">
            <h2  class="order__content__title">手机手机手机手机</h2>
            <div class="order__content__address">收货地址：浙江省杭州市西湖区</div>
            <div class="order__content__price">￥120</div>
          </div>
        </div>
        <div class="order__bottom">
          <van-button size="small">确认收货</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const handleBack = () => history.back();
</script>

<style lang="less" scoped>
.order-list {
  padding: 0 0 10px;
}

.order {
  padding: 15px 20px;
  margin-top: 10px;
  background-color: #fff;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    margin-top: 15px;

    &__img {
      width: 60px;
      height: 60px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &__right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__bottom {
    text-align: right;
  }
}
</style>
