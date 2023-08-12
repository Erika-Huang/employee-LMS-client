<template>
  <h1>欢迎来到登录界面</h1>
  <el-button @click="goHome">回首页</el-button>
  <!-- 引入welcome组件 -->
  <Welcome msg='erika'/>
</template>

<script>
  // 1. 导入welcome组件
  import Welcome from './Welcome.vue';

  export default {
    name: 'login',
    // 2. 加载welcome组件
    components: {
      Welcome
    },
    methods: {
      goHome() {
        this.$router.push('/welcome')
      }
    }
  }
</script>

<style>
a {
  color: #42b983;
}
</style>