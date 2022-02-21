<template>
    <div class="public none">
        <div class="task_type">
            <span>类型</span>
            <br />
            <select name="task_type_list" disabled>
                <option value="express">拿快递</option>
                <option value="borrow">借东西</option>
                <option value="sale">卖二手</option>
                <option value="study">一起学习</option>
            </select>
        </div>

        <div class="task_title">
            <span>标题</span>
            <br />
            <input type="text" />
        </div>

        <div class="task_price">
            <span>出价</span>
            <br />
            <input type="text" />
        </div>

        <div class="task_about">
            <span>任务详情</span>
            <br />
            <textarea></textarea>
        </div>

        <div class="public_button">发 布</div>
    </div>
</template>

<script>
export default {
    name: "HelpMeMenu",
    props: ["id"],
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
    padding-left: 0.5rem;
    outline: 0;
    box-sizing: border-box;
}

.public input {
    margin-top: 0.3rem;
    width: 18rem;
    height: 1.8rem;
    border-radius: 0.2rem;
    padding-left: 0.5rem;
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
    padding: 0.5rem;
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