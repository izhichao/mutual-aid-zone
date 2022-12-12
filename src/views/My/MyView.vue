<template>
  <div class="main-content">
    <div class="bg"></div>

    <div class="content">
      <div class="content__img">
        <van-image fit="cover" round :src="userModel.avatar" />
      </div>
      <div class="content__name">{{ userModel.username }}</div>
      <div class="content__id">手机号: {{ userModel.phone }}</div>

      <div class="content__select">
        <div
          class="content__select__item"
          v-for="(item, index) in selectList"
          :key="item.text"
          @click="handleEnter(index)"
        >
          <div class="content__select__item__icon iconfont" v-html="item.icon"></div>
          <div class="content__select__item__title">{{ item.text }}</div>
          <div class="content__select__item__enter iconfont">&#xe679;</div>
        </div>
      </div>
    </div>
    <van-button type="primary" round block class="content__logout-btn small-btn" @click="handleLogout">
      退 出 登 录
    </van-button>
  </div>

  <van-popup v-model:show="show" round>
    <van-form @click.stop @submit="handlePassword" validate-trigger="onSubmit" class="reset">
      <van-cell-group inset>
        <van-field
          v-model="userModel.oldPassword"
          :rules="passwordRules"
          type="password"
          label="原密码"
          placeholder="请输入原密码"
          autocomplete="true"
        />
        <van-field
          v-model="userModel.password"
          :rules="passwordRules"
          type="password"
          label="新密码"
          placeholder="请输入新密码"
          autocomplete="true"
        />
        <van-field
          v-model="userModel.passwordAgain"
          :rules="passwordAgainRules"
          type="password"
          label="确认密码"
          placeholder="请再次输入新密码"
          autocomplete="true"
        />
        <van-button type="primary" class="small-btn" round native-type="submit">提交</van-button>
      </van-cell-group>
    </van-form>
  </van-popup>

  <Docker :currentIndex="3" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Docker from '../../components/Docker.vue';
import { useUser } from '../../composables/useUser';

const router = useRouter();
const show = ref(false);
const selectList = [
  { icon: '&#xe660;', text: '个人信息' },
  { icon: '&#xe628;', text: '修改密码' },
  { icon: '&#xe626;', text: '我的订单' },
  { icon: '&#xe605;', text: '联系客服' }
];

const handleEnter = (index: number) => {
  switch (index) {
    case 0:
      router.push({ name: 'Info' });
      break;
    case 1:
      show.value = true;
      break;
    case 2:
      router.push({ name: 'Order' });
      break;
    case 3:
      router.push({ name: 'Ticket' });
      break;
  }
};

const { userModel, passwordRules, passwordAgainRules, handlePassword, handleLogout } = useUser();
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
  margin: 120px 16px 0;
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

    .van-image {
      width: 94px;
      height: 94px;
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
    margin: 30px auto;
  }
}

.reset {
  width: 80vw;
  text-align: center;
  padding: 20px 0;
  box-sizing: border-box;

  .van-button {
    margin-top: 20px;
  }
}
</style>
