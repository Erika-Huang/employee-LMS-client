<template>
    <div class="page-404">
        <img src="@/assets/images/404.svg" alt="">

        <p class="btn-home">您访问的页面不存在，请点击
            <el-button @click="goHome" type="large"> 回首页</el-button>
        </p>

    </div>
</template>
<script>
export default {
    name: '404',
    methods: {
        goHome() {
            this.$router.push("/")
        }
    }
}
</script>

<style lang="scss">
.page-404 {
    position: relative;

    img {
        width: 50%;
        height: 90vh;
    }

    .btn-home {
        float: right;
        width: 50%;
        height: 80vh;
        line-height: 80vh;
        font-size: 40px;
    }
}
</style>