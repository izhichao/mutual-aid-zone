<template>
  <router-link :to="{ name: 'ChatDetail', params: { id: chat.target } }">
    <div class="chat">
      <div class="chat__left">
        <div class="chat__img">
          <img :src="chat.avatar" />
        </div>
      </div>
      <div class="chat__right">
        <div class="chat__top">
          <div class="chat__name">{{ chat.username }}</div>
          <div class="chat__time">{{ formatTime(chat.createdAt).slice(0, 10) }}</div>
        </div>
        <div class="chat__content">{{ chat.content }}</div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { IChat } from '../types';
import { formatTime } from '../utils/formatTime';
defineProps({
  chat: {
    type: Object as PropType<IChat>,
    required: true
  }
});
</script>

<style lang="less" scoped>
.chat {
  margin-top: 1px;
  padding: 15px;
  background-color: #fff;
  display: flex;

  &:nth-child(1) {
    margin-top: 10px;
  }

  &__right {
    flex: 1;
  }

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__img {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  &__name {
    font-size: 16px;
    color: #333;
  }

  &__time {
    font-size: 14px;
    line-height: 18px;
  }

  &__content {
    margin-top: 5px;
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
