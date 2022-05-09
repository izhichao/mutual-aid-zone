<template>
  <van-nav-bar title="发布任务" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <van-form @submit="handleSubmit">
      <van-cell-group inset>
        <van-field label="标题" placeholder="请输入标题" v-model="taskModel.title" />
        <van-field label="价格" placeholder="请输入价格" v-model="taskModel.price" />
        <van-field
          rows="3"
          autosize
          label="描述"
          type="textarea"
          maxlength="70"
          placeholder="请输入描述"
          v-model="taskModel.content"
          show-word-limit
        />
        <van-field name="uploader" label="图片上传">
          <template #input>
            <van-uploader :max-count="6" v-model="taskModel.images" />
          </template>
        </van-field>
      </van-cell-group>
      <van-button round block type="primary" native-type="submit">提 交</van-button>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { UploaderFileListItem } from 'vant/lib/uploader/types';
import { reactive } from 'vue';
const handleBack = () => history.back();

interface Task {
  title: string;
  price: number;
  content: string;
  images: UploaderFileListItem[];
}

const taskModel = reactive<Task>({
  title: '',
  price: null,
  content: '',
  images: []
});

const handleSubmit = () => {

};
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
