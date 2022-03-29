<template>
  <!-- 通过插槽来显示不同的顶栏 -->
  <HeaderTab>
    <router-link to="/helpme" class="header__swap__one header__swap--active">帮帮我</router-link>
    <router-link to="/ihelp" class="header__swap__two">我来帮</router-link>
  </HeaderTab>
  <!-- 任务表单 -->
  <div class="main-content">
    <div class="taskinput">
      <div class="taskinput__type">
        <span>类型</span>
        <br />
        <select name="taskinput__list" disabled v-model="typeVal">
          <option value="express">拿快递</option>
          <option value="borrow">借东西</option>
          <option value="sale">卖二手</option>
          <option value="study">一起学习</option>
        </select>
      </div>

      <div class="taskinput__title">
        <span>标题</span>
        <br />
        <input type="text" v-model="title" />
      </div>

      <div class="taskinput__price">
        <span>出价</span>
        <br />
        <input type="text" v-model="price" />
      </div>

      <div class="taskinput__about">
        <span>任务详情</span>
        <br />
        <textarea v-model="content"></textarea>
      </div>

      <div class="button" @click="publish">发 布</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderTab from '../components/Tab/HeaderTab.vue';

export default defineComponent({
  name: 'HelpMeMenuView',
  components: { HeaderTab },
  // 页面的id用于获取任务类型
  props: ['id'],
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const router = useRouter();

    const title = ref('');
    const price = ref<number>();
    const content = ref('');
    // 将获取到的id存储为number类型
    const id: number = props.id;
    // 定义枚举类型type，将id装换为类型的名称
    enum type {
      express = 1,
      borrow = 2,
      sale = 3,
      study = 4
    }
    // 获取类型名称
    const typeVal = type[id];

    const publish = () => {
      // 判断是否已登录
      if (localStorage.getItem('token') == null) {
        alert('请登录！');
        router.push('/login');
      } else {
        proxy?.$http
          .post(
            '/task',
            {
              type: typeVal,
              title: title.value,
              price: price.value,
              content: content.value
            },
            { headers: { token: localStorage.getItem('token') } }
          )
          .then(() => {
            alert('发布成功');
            router.push('/ihelp');
          });
      }
    };
    return {
      title,
      price,
      content,
      typeVal,
      publish
    };
  }
});
</script>

<style lang="less" scoped>
.taskinput {
  width: 95%;
  margin: (10vw / 3.75) auto;
  padding-bottom: (20vw / 3.75);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: (16vw / 3.75);
  font-weight: 700;
  border-radius: 0.2rem;
  box-shadow: #666 0px 0px 3px;

  div {
    margin-top: (16vw / 3.75);
  }

  select {
    font-size: (16vw / 3.75);
    margin-top: (4.8vw/3.75);
    width: (288vw / 3.75);
    height: (28.8vw / 3.75);
    border-radius: 5px;
    padding-left: 5px;
    outline: 0;
    box-sizing: border-box;
  }

  input {
    font-size: (16vw / 3.75);
    margin-top: 5px;
    width: (288vw / 3.75);
    height: (28.8vw / 3.75);
    border-radius: 5px;
    padding-left: 5px;
    outline: 0;
    box-sizing: border-box;
  }

  textarea {
    font-size: (16vw / 3.75);
    margin-top: 5px;
    width: (288vw / 3.75);
    border-radius: 5px;
    padding: 5px;
    outline: 0;
    height: (160vw / 3.75);
    resize: none;
    box-sizing: border-box;
  }
}
</style>
