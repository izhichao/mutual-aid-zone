<template>
  <van-nav-bar title="修改信息" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <van-form>
      <van-cell-group inset>
        <div class="avatar">
          <van-image fit="cover" round :src="userDetail.avatar" />
        </div>
        <van-field type="text" label="用户名" placeholder="请输入您的用户名" v-model="userDetail.username" />
        <van-field type="tel" label="手机号" placeholder="请输入您的手机号" v-model="userDetail.phone" />
        <van-field type="email" label="邮箱" placeholder="请输入您的邮箱" v-model="userDetail.email" />
        <van-field rows="3" autosize label="收货地址" type="textarea" maxlength="45" placeholder="请输入收货地址" v-model="userDetail.address" />
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader v-model="userDetail.avatarFile" />
          </template>
        </van-field>
      </van-cell-group>

      <van-button round block type="primary" native-type="submit">提 交</van-button>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { useUserDetail } from '../../composables/useUserDetail';
const handleBack = () => history.back();
const { userDetail } = useUserDetail();
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
