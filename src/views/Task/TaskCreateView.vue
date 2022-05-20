<template>
  <van-nav-bar title="发布任务" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <van-form @submit="handleSubmit('create')" validate-trigger="onSubmit">
      <van-cell-group inset>
        <van-field v-model="taskModel.title" label="标题" placeholder="请输入标题" :rules="titleRules" />
        <van-field v-model="taskModel.price" type="number" label="价格" placeholder="请输入价格" :rules="priceRules" />
        <van-field
          v-model="taskModel.content"
          :rules="rules"
          rows="3"
          autosize
          label="描述"
          type="textarea"
          maxlength="70"
          placeholder="请输入描述"
          show-word-limit
        />
        <van-field name="uploader" label="图片上传">
          <template #input>
            <van-uploader :max-count="6" v-model="taskModel.imgFiles" />
          </template>
        </van-field>
      </van-cell-group>
      <van-button round block type="primary" native-type="submit">提 交</van-button>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { useTask } from '../../composables/useTask';
const handleBack = () => history.back();
const { titleRules, priceRules, rules, taskModel, handleSubmit } = useTask();
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
