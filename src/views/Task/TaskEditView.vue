<template>
  <van-nav-bar :title="text.title" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <van-form @submit="handleSubmit(text.type)" validate-trigger="onSubmit">
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
        <van-field name="uploader" :label="text.label">
          <template #input>
            <van-uploader :max-count="6" v-model="taskModel.imgFiles" />
          </template>
        </van-field>
      </van-cell-group>
      <div class="btn">
        <van-button round block type="primary" native-type="submit">提 交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { Toast } from 'vant';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createTask, editTask } from '../../api/task';
import { useTask } from '../../composables/useTask';

const { taskModel, handleBack, handleDetail } = useTask();
const route = useRoute();
const router = useRouter();

const text = reactive({
  title: '发布任务',
  label: '图片上传',
  type: 'create'
});

if (route.name === 'Edit') {
  text.title = '编辑任务';
  text.label = '新增图片';
  text.type = 'edit';
  handleDetail();
}

const handleSubmit = async (type: string) => {
  const formData = new FormData();
  formData.append('title', taskModel.value.title);
  formData.append('price', taskModel.value.price.toString());
  formData.append('content', taskModel.value.content);
  taskModel.value.imgFiles &&
    taskModel.value.imgFiles.forEach((item) => {
      formData.append('imgFiles', item.file);
    });

  if (type === 'create') {
    const { data: res } = await createTask(formData);
    if (res.errno === 0) {
      router.push({ name: 'Detail', params: { id: res.data._id } });
      Toast('发布成功');
    } else {
      Toast(res.msg);
    }
  } else if (type === 'edit') {
    formData.append('_id', route.params.id.toString());
    const { data: res } = await editTask(formData);
    if (res.errno === 0) {
      router.push({ name: 'Detail', params: { id: res.data._id } });
      Toast('编辑成功');
    } else {
      Toast(res.msg);
    }
  }
};

// 表单校验规则
const rules = [{ required: true, message: '请填写完整' }];
const titleRules = [
  ...rules,
  {
    validator: (val: string) => {
      if (val.length > 15) {
        return '标题不能超过15字';
      } else if (val.length < 3) {
        return '标题不能少于3字';
      }
    }
  }
];
const priceRules = [
  ...rules,
  {
    validator: (val: number) => {
      if (val < 0) {
        return '价格不能为小于零';
      } else if (val >= 1000) {
        return '价格不能超过1000';
      }
    }
  }
];
</script>

<style lang="less" scoped>
@import '../../style/mixins.less';
.main-content {
  bottom: 0;
}

.btn {
  padding: 30px 15px 0;
}

.van-cell-group {
  margin-top: 20px;
  .shadow;
}
</style>
