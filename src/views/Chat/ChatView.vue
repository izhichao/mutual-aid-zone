<template>
  <van-nav-bar title="聊天列表" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="chat-list">
      <Chat v-for="item in chatList" :chat="item"></Chat>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Chat from '../../components/Chat.vue';
import { IChat } from '../../types';
import { getUserChats } from '../../api/chat';
const handleBack = () => history.back();

const chatList = ref<IChat[]>();

const handleChatList = async () => {
  const { data: res } = await getUserChats();
  chatList.value = res.data;
};
handleChatList();
</script>

<style lang="less" scoped>
.main-content {
  bottom: 0;
}

.chat-list {
  padding: 0 0 10px;
}
</style>
