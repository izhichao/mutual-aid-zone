<template>
  <van-nav-bar title="联系客服" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="send">
      <van-field
        v-model="message"
        :autosize="{ minHeight: 80 }"
        label="联系客服"
        type="textarea"
        maxlength="80"
        placeholder="请描述您的问题，客服将在3个工作日内进行回复。"
        show-word-limit
      />
      <van-button type="primary" class="send__btn small-btn" block round @click="handleCreate">立即发送</van-button>
    </div>

    <div class="list" v-for="item in ticketList">
      <div class="list__title">{{ item.question }}</div>
      <div class="list__content">{{ item.answer ? item.answer : '未回复' }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Toast } from 'vant';
import { ref } from 'vue';
import { getTickets, createTicket } from '../../api/ticket';
const handleBack = () => history.back();
const message = ref();

const handleCreate = async () => {
  if (message.value) {
    const { data: res } = await createTicket(message.value);
    Toast(res.msg);
    message.value = '';
    handleTickets();
  } else {
    Toast('请先输入内容');
  }
};

const ticketList = ref([]);
const handleTickets = async () => {
  const { data: res } = await getTickets();
  ticketList.value = res.data;
};
handleTickets();
</script>

<style lang="less" scoped>
.send {
  margin-top: 10px;
  background-color: #fff;
  padding-bottom: 10px;

  &__btn {
    margin: 10px auto 0;
  }
}

.list {
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;

  &__title {
    color: #333;
  }

  &__content {
    margin-top: 10px;
    color: #999;
  }
}
</style>
