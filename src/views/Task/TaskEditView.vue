<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="handleBack" />
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

      <van-button round block type="primary" native-type="submit">提 交</van-button>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const handleBack = () => history.back();
const title = ref('编辑任务')
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
  .shadow;
}
</style>
