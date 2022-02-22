<template>
    <div>
        <!-- 通过插槽来显示不同的顶栏 -->
        <header-tab>
            <router-link to="/helpme" class="swap_1 page_on">帮帮我</router-link>
            <router-link to="/ihelp" class="swap_2">我来帮</router-link>
        </header-tab>
        <!-- 任务表单 -->
        <div class="public none">
            <div class="task_type">
                <span>类型</span>
                <br />
                <select name="task_type_list" disabled v-model="typeVal">
                    <option value="express">拿快递</option>
                    <option value="borrow">借东西</option>
                    <option value="sale">卖二手</option>
                    <option value="study">一起学习</option>
                </select>
            </div>

            <div class="task_title">
                <span>标题</span>
                <br />
                <input type="text" v-model="title" />
            </div>

            <div class="task_price">
                <span>出价</span>
                <br />
                <input type="text" v-model="price" />
            </div>

            <div class="task_about">
                <span>任务详情</span>
                <br />
                <textarea v-model="content"></textarea>
            </div>

            <div class="public_button" @click="publish">发 布</div>
        </div>
    </div>
</template>

<script>
import HeaderTab from "../Tab/HeaderTab.vue";
export default {
    name: "HelpMeMenu",
    components: { HeaderTab },
    // 页面的id用于获取任务类型
    props: ["id"],
    data() {
        return {
            title: "",
            price: "",
            content: "",
        };
    },
    methods: {
        publish() {
            // 判断是否已登录
            if (localStorage.getItem("token") == null) {
                alert("请登录！");
                this.$router.push("/login");
            } else {
                this.$http
                    .post(
                        "/task",
                        {
                            type: this.typeVal,
                            title: this.title,
                            price: this.price,
                            content: this.content,
                        },
                        { headers: { token: localStorage.getItem("token") } }
                    )
                    .then((res) => {
                        alert("发布成功");
                        this.$router.push("/ihelp");
                    });
            }
        },
    },
    computed: {
        // 通过计算属性，将类型id转换为类型名
        typeVal() {
            if (this.id === "1") {
                return "express";
            } else if (this.id === "2") {
                return "borrow";
            } else if (this.id === "3") {
                return "sale";
            } else {
                return "study";
            }
        },
    },
};
</script>

<style scoped>
.public {
    width: 95%;
    height: 32rem;
    margin: 1rem auto;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    border-radius: 0.2rem;
    box-shadow: #666 0px 0px 3px;
}

.public select {
    margin-top: 0.3rem;
    width: 18rem;
    height: 1.8rem;
    border-radius: 0.2rem;
    padding-left: 0.25rem;
    outline: 0;
    box-sizing: border-box;
}

.public input {
    margin-top: 0.3rem;
    width: 18rem;
    height: 1.8rem;
    border-radius: 0.2rem;
    padding-left: 0.25rem;
    outline: 0;
    box-sizing: border-box;
}

.public div {
    margin-top: 1rem;
}

.task_about textarea {
    margin-top: 0.3rem;
    width: 18rem;
    border-radius: 0.2rem;
    padding: 0.25rem;
    outline: 0;
    height: 10rem;
    resize: none;
    box-sizing: border-box;
}

.public_button {
    width: 18rem;
    background-color: #950040;
    height: 2.5rem;
    color: #fff;
    text-align: center;
    line-height: 2.5rem;
    font-size: 1.2rem;
    border-radius: 0.2rem;
}
</style>