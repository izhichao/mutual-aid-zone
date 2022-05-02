<template>
  <div class="main-content">
    <!-- <div class="title">我的</div> -->

    <div class="bg"></div>

    <div class="content">
      <div class="content__img">
        <img src="https://zhichao.org/profile.jpg" />
      </div>
      <div class="content__name">只抄</div>
      <div class="content__id">手机号: 1069643013</div>

      <div class="content__select">
        <div class="content__select__item" v-for="(item, index) in selectList" :key="item.text">
          <div class="content__select__item__icon iconfont" v-html="item.icon"></div>
          <div class="content__select__item__title">{{ item.text }}</div>
          <div class="content__select__item__enter iconfont">&#xe679;</div>
        </div>
      </div>
    </div>
    <van-button type="primary" round class="content__logout-btn" @click="handleLogout">退 出 登 录</van-button>
  </div>

  <Docker :currentIndex="3" />
</template>

<script lang="ts" setup>
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import Docker from '../../components/Docker.vue';

const selectList = [
  { icon: '&#xe660;', text: '个人信息' },
  { icon: '&#xe628;', text: '修改密码' },
  { icon: '&#xe605;', text: '联系客服' }
];

const router = useRouter();

const handleLogout = () => {
  Toast('注销成功');
  localStorage.removeItem('token');
  router.push({ name: 'Home' });
};
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/mixins.less';
.main-content {
  top: 0;
}

.bg {
  position: absolute;
  left: 50%;
  top: -250px;
  transform: translate(-50%);
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  z-index: -1;
}

.content {
  position: relative;
  margin: 120px 18px 0;
  background: #fff;
  border-radius: 8px;
  text-align: center;
  .shadow;

  &__img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -47px;
    width: 94px;
    height: 94px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
  &__name {
    padding-top: 59px;
    color: #262628;
    font-size: 24px;
    line-height: 36px;
  }
  &__id {
    margin-top: 10px;
    color: #c1c0c9;
  }

  &__select {
    padding: 12px 24px;
    box-sizing: border-box;
    &__item {
      display: flex;
      position: relative;
      padding: 12px 0;

      &__icon {
        width: 22px;
        height: 22px;
        font-size: 20px;
      }

      &__title {
        color: @fontColor;
        line-height: 22px;
        margin-left: 17px;
        font-size: 14px;
      }

      &__enter {
        position: absolute;
        right: 8px;
        transform: rotate(180deg);
        color: #c2c4ca;
        line-height: 22px;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  &__logout-btn {
    display: block;
    width: 120px;
    margin: 20px auto;
    height: 40px;
    font-weight: 500;
  }
}
</style>
