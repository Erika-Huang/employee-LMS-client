<template>
  <h1>欢迎来到登录界面</h1>
  <el-button @click="goHome">回首页</el-button>

</template>

<script>
  export default {
    name: 'login',
    mounted() {
      this.$request.get('/login',{name:'Erika'}).then((res)=> {
        console.log(res);
      })
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