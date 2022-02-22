<template>
    <footer>
        <router-link to="/" class="sub">
            <img :src="url1" />
            <p :class="indexFontStatus ? 'on' : ''">互助圈</p>
        </router-link>

        <router-link to="/task" class="sub">
            <img :src="url2" />
            <p :class="this.$route.path === '/task' ? 'on' : ''">任务</p>
        </router-link>

        <router-link to="/store" class="sub">
            <img :src="url3" />
            <p :class="this.$route.path === '/store' ? 'on' : ''">商城</p>
        </router-link>
    </footer>
</template>

<script>
export default {
    name: "FooterTab",
    data() {
        return {
        }
    },
    computed: {
        // 使用计算属性动态修改底栏图标开启与关闭状态
        url1() {
            // 通过正则表达式来匹配以/helpme开头的路径
            if ( /^\/helpme/g.test(this.$route.path) || this.$route.path === '/ihelp') {
                return '/src/assets/home_on.png'
            } else {
                return '/src/assets/home_off.png'
            }
        },
        url2() {
            if (this.$route.path === '/task') {
                return '/src/assets/task_on.png'
            } else {
                return '/src/assets/task_off.png'
            }
        },
        url3() {
            if (this.$route.path === '/store') {
                return '/src/assets/store_on.png'
            } else {
                return '/src/assets/store_off.png'
            }
        },
        indexFontStatus() {
            if ( /^\/helpme/g.test(this.$route.path) || this.$route.path === '/ihelp') {
                return true
            } else {
                return false
            }
        }
    }
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

.sub .on {
    color: #950040;
}
</style>