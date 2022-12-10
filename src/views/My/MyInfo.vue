<template>
  <van-nav-bar title="修改信息" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <van-form @submit="handleEdit" validate-trigger="onSubmit">
      <van-cell-group inset>
        <div class="avatar">
          <van-image fit="cover" round :src="userModel.avatar" />
        </div>
        <van-field v-model="userModel.username" :rules="usernameRules" type="text" label="用户名" placeholder="请输入您的用户名" />
        <van-field v-model="userModel.phone" :rules="phoneRules" type="tel" label="手机号" placeholder="请输入您的手机号" />
        <van-field v-model="userModel.email" :rules="emailRules" type="email" label="邮箱" placeholder="请输入您的邮箱" />
        <van-field v-model="userModel.address" rows="3" autosize label="收货地址" type="textarea" maxlength="45" placeholder="请输入收货地址" />
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader :max-count="1" v-model="userModel.avatarFile" />
          </template>
        </van-field>
      </van-cell-group>

      <van-button round block type="primary" native-type="submit" class="small-btn">提 交</van-button>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from '../../composables/useUser';
const handleBack = () => history.back();
const { userModel, usernameRules, phoneRules, emailRules, handleEdit } = useUser();
</script>

<style lang="less" scoped>
@import '../../style/mixins.less';
.main-content {
  bottom: 0;
}

.van-button {
  margin: 30px auto 0;
}

.van-cell-group {
  margin-top: 20px;
  padding-bottom: 10px;
  .shadow;
}
.avatar {
  text-align: center;
  padding: 20px 0;
  .van-image {
    width: 94px;
    height: 94px;
  }
}
</style>
