<template>
    <div>
        <div class="task_content ${ifLast}">
            <h2>${obj.title}</h2>
            <div class="task_detail">${obj.content}</div>
            <ul class="task_sub">
                <li class="task_phone">用户:123</li>
                <li class="price">出价:123元</li>
                <li class="task_type">类型:123</li>
            </ul>
            <ul class="task_sub">
                <li class="time">2021-21-21</li>
                <li class="task_id">任务号:1234098号</li>
                <li class="${edit_type}">编辑</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "TaskList",
};
</script>

<style scoped>
.task_content {
    height: 12rem;
    width: 100%;
    margin: 1rem 0 0 0;
    background-color: #fff;
    border-radius: 2%;
    box-sizing: border-box;
    box-shadow: #666 0px 0px 3px;
    padding: 16px;
}

.task_content h2 {
    font-weight: 700;
    font-size: 1.3rem;
}

.task_detail {
    height: 4.5rem;
    margin: 0.5rem 0;
}

.task_sub {
    display: flex;
    justify-content: space-between;
}

.task_sub .abandon,
.task_sub .delete,
.task_sub .get {
    /* position: relative;
    right: 1rem; */
    cursor: pointer;
    color: #950040;
}
</style>