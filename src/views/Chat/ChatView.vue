<template>
  <van-nav-bar title="聊天列表" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="main-content">
    <div class="chat-list">
      <Chat></Chat>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Chat from '../../components/Chat.vue';
const handleBack = () => history.back();

</script>

<style lang="less" scoped>
.main-content {
  bottom: 0;
}

.chat-list {
  padding: 0 0 10px;
}
</style>
