<template>
    <div>
        <header-tab></header-tab>
        <section>
        <!-- 钱包部分 -->
        <div class="wallet">
            <div class="blance">
                <img src="/src/assets/wallet.png" alt />
                <div class="blance_sub">
                    <h2>
                        余额：
                        <span class="user_blance">0</span> 元
                    </h2>
                </div>
            </div>

            <div class="charge">
                <h2>充值金额(元)</h2>
                <input type="number" class="charge_input" />
                <ul>
                    <li class="charge10">充10元</li>
                    <li class="charge20">充20元</li>
                    <li class="charge50">充50元</li>
                    <li class="charge100">充100元</li>
                </ul>
                <div class="charge_button">充 值</div>
            </div>
        </div>

        <!-- 商城部分 -->
        <div class="goods_list">
            <!-- 从后台获取商品信息 -->
        </div>
    </section>
    </div>
</template>

<script>
import App from '../App.vue';
import HeaderTab from './Tab/HeaderTab.vue'
export default {
    name: "Store",
    components: {
        HeaderTab,
        App
    }
};
</script>

<style scoped>
/* shop_start */
.goods_list {
    height: auto;
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.goods_content {
    height: 8rem;
    width: 100%;
    margin: 1rem 0 0 0;
    background-color: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 2%;
    box-sizing: border-box;
    padding: 4%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: #666 0px 0px 3px;
}

.goods_content img {
    width: 6rem;
    height: 6rem;
    background-color: yellow;
}

.introduce {
    position: relative;
    width: 9.5rem;
}

.introduce h2 {
    font-weight: 700;
    font-size: 1.3rem;
    height: 1.3em;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.introduce span {
    position: relative;
    color: red;
    font-weight: 700;
    font-size: 1.2rem;
}

.exchange {
    position: relative;
    width: 4rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    color: #fff;
    font-weight: 700;
    border-radius: 1rem;
    background-color: #950040;
}

/* shop_end */

/* wallet_start */
.wallet {
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.blance {
    height: 8rem;
    width: 100%;
    margin: 1rem 0 0 0;
    background-color: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 2%;
    box-sizing: border-box;
    padding: 4%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: #666 0px 0px 3px;
}

.blance img {
    width: 6rem;
    height: 6rem;
}

.blance_sub {
    position: relative;
    left: -1rem;
}

.blance_sub h2 {
    font-weight: 700;
    font-size: 1.3rem;
    height: 1.3em;
}

.blance_sub span {
    position: relative;
    color: red;
    font-weight: 700;
}

.charge {
    height: 16rem;
    width: 100%;
    margin: 1rem 0 0 0;
    background-color: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 2%;
    box-sizing: border-box;
    padding: 4%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-shadow: #666 0px 0px 3px;
    /* align-items: center; */
}

.charge h2 {
    font-size: 1.5rem;
    font-weight: 700;
}

.charge input {
    width: 10rem;
    height: 2rem;
    padding-left: 0.5em;
    border: 1px solid #666;
    border-radius: 0.2rem;
    outline: none;
}

ul {
    display: flex;
    justify-content: space-between;
}

ul li {
    height: 2.5rem;
    width: 4rem;
    border: 1px solid #666;
    border-radius: 0.2rem;
    line-height: 2.5rem;
    text-align: center;
    color: black;
}

.charge_button {
    width: 100%;
    background-color: #950040;
    height: 2.5rem;
    color: #fff;
    text-align: center;
    line-height: 2.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 0.2rem;
}

/* wallet_end */

.swap_1 {
    border-radius: 1rem !important;
    width: 12rem !important;
}
</style>