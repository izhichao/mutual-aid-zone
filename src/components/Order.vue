<template>
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
        <h2 class="order__content__title bold">手机手机手机手机</h2>
        <div class="order__content__address">
          <span class="bold">收货地址</span>
          浙江省杭州市西湖区西湖街道西湖社区
        </div>
        <div class="order__content__id">
          <span class="bold">订单号</span>
          63a72040779a611cf6fa271a
        </div>
      </div>
    </div>
    <div class="order__bottom">
      <span class="order__bottom__price">￥120</span>
      <van-button size="small">确认收货</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.bold {
  font-weight: 700;
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
    margin: 15px 0;

    &__img {
      width: 80px;
      height: 80px;
      margin-right: 15px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &__right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &__price {
      color: crimson;
      font-weight: 700;
      font-size: 18px;
    }

    button {
      text-align: right;
    }
  }
}
</style>
