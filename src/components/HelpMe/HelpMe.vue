<template>
    <div>
        <header-tab></header-tab>
        <div class="item">
            <router-link to="/helpme/1">
                <div class="express">
                    <img src="/src/assets/express.png" alt />
                    <span>拿快递</span>
                </div>
            </router-link>

            <router-link to="/helpme/2">
                <div class="borrow">
                    <img src="/src/assets/borrow.png" alt />
                    <span>借东西</span>
                </div>
            </router-link>

            <router-link to="/helpme/3">
                <div class="sale">
                    <img src="/src/assets/sale.png" alt />
                    <span>卖二手</span>
                </div>
            </router-link>

            <router-link to="/helpme/4">
                <div class="study">
                    <img src="/src/assets/study.png" alt />
                    <span>一起学习</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import HeaderTab from "../Tab/HeaderTab.vue";

export default {
    name: "HelpMe",
    components: {
        HeaderTab,
    },
};
</script>

<style scoped>
.item {
    position: absolute;
    width: 100%;
    top: 4rem;
    bottom: 4rem;
    left: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    place-items: center;
    grid-row-gap: -2rem;
}

.item div {
    display: flex;
    flex-direction: column;
    background-color: #950040;
    height: 10rem;
    width: 10rem;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.item div img {
    height: 60%;
    width: 60%;
}

.item div span {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
}

.express,
.borrow {
    position: relative;
    top: 2rem;
}

.sale,
.study {
    position: relative;
    bottom: 2rem;
}
</style>