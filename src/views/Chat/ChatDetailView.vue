<template>
  <van-nav-bar :title="receiverInfo.username" left-text="返回" left-arrow @click-left="handleBack" />

  <div class="main-content" ref="contentRef">
    <div class="content">
      <template v-for="item in chatList">
        <div class="content__box me" v-if="item.sender === sender">
          <div class="content__text content__left">{{ item.content }}</div>
          <div class="content__img">
            <img :src="userModel.avatar" />
          </div>
        </div>

        <div class="content__box" v-else>
          <div class="content__img content__left">
            <img :src="receiverInfo.avatar" />
          </div>
          <div class="content__text">{{ item.content }}</div>
        </div>
      </template>
    </div>
  </div>
  <div class="send">
    <div class="send__box" @keyup.enter="handleSend">
      <input type="text" v-model="content" />
    </div>
    <van-button class="send__btn" type="primary" size="small" round @click="handleSend">发送</van-button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import io from 'socket.io-client';
import { IBaseChat } from '../../types';
import { useUser } from '../../composables/useUser';
import { getPastChats } from '../../api/chat';
import { getUser } from '../../api/user';
import { baseURL } from '../../utils/request';

const route = useRoute();
const { userModel } = useUser();
const receiver = route.params.id as string;
const sender = userModel.value._id;
const handleBack = () => history.back();

const chatList = ref<IBaseChat[]>();

// 连接socket.io
const url = new URL(baseURL, window.location.origin);
const socket = io(url.origin, { path: `${url.pathname === '/' ? '' : url.pathname}/socket.io/`, query: { sender } });

// 接受消息
socket.on('chat', (message: IBaseChat) => {
  chatList.value.push(message);
});

// 发送消息
const content = ref();
const handleSend = () => {
  const message: IBaseChat = { sender, receiver, content: content.value };
  if (message.content) {
    socket.emit('chat', message);
    chatList.value.push(message);
  }
  content.value = '';
};

// 获取对方用户名、头像
const receiverInfo = reactive({
  username: '',
  avatar: ''
});
const handleReceiverInfo = async () => {
  const { data: res } = await getUser(receiver);
  receiverInfo.username = res.data.username;
  receiverInfo.avatar = res.data.avatar;
};

// 获取聊天记录
const handlePastChatList = async () => {
  const { data: res } = await getPastChats(receiver);
  chatList.value = res.data;
};

// 页面自动滚动到底部
const contentRef = ref();
watch(
  () => chatList.value,
  () => {
    nextTick(() => {
      contentRef.value.scrollTop = contentRef.value.scrollHeight - contentRef.value.clientHeight;
    });
  },
  { deep: true }
);

handlePastChatList();
handleReceiverInfo();
</script>

<style lang="less" scoped>
.content {
  padding: 0 10px 10px;

  &__box {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  &__img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__left {
    margin-right: 10px;
  }
}

.me {
  justify-content: end;
}

.send {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 50px;
  padding: 10px 20px;
  border-top: 1px solid #ccc;
  background-color: #fff;

  &__box {
    flex: 1;
    height: 30px;
    margin-right: 15px;

    input {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0 15px;
      border-radius: 15px;
      background-color: #eeeff4;
      outline: none;
      border: none;
    }
  }

  &__btn {
    height: 30px;
    width: 50px;
  }
}
</style>
