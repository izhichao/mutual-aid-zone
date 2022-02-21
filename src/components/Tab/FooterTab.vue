<template>
    <footer>
        <router-link to="/" class="sub">
            <img src="/src/assets/home_on.png" />
            <p>互助圈</p>
        </router-link>

        <router-link to="/task" class="sub">
            <img src="/src/assets/task_off.png" />
            <p>任务</p>
        </router-link>

        <router-link to="/store" class="sub">
            <img src="/src/assets/store_off.png" />
            <p>商城</p>
        </router-link>
    </footer>
</template>

<script>
export default {
    name: "FooterTab",
};
</script>

<style scoped>
footer {
    display: flex;
    height: 4rem;
    width: 100%;
    align-items: center;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    box-shadow: #666 0px 0px 3px;
}

footer .sub {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.sub img {
    height: 2rem;
    width: 2rem;
}

.sub p {
    font-size: 15px;
    color: #707070;
}

.on {
    color: #950040;
}
</style>