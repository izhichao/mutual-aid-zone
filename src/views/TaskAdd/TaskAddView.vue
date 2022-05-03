<template>
  <van-nav-bar title="添加任务" left-text="返回" left-arrow @click="handleBack" />
  <div class="main-content">
    <van-form>
      <van-cell-group inset>
        <van-field name="标题" label="标题" placeholder="请输入标题" />
        <van-field name="价格" label="价格" placeholder="请输入价格" />
        <van-field rows="3" autosize label="描述" type="textarea" maxlength="70" placeholder="请输入描述" show-word-limit />
        <van-field name="uploader" label="图片上传">
          <template #input>
            <van-uploader />
          </template>
        </van-field>
      </van-cell-group>

      <van-button round block type="primary" native-type="submit">发布</van-button>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
const handleBack = () => history.back();
</script>

<style lang="less" scoped>
.main-content {
  bottom: 0;
}

.van-form {
  padding-top: 20px;
}

.van-button {
  margin: 20px auto 0;
}
</style>
