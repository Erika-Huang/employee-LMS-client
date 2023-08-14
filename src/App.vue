<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
      // this.$storage.setItem("userInfo",{age:10,name:'erika'})
      // console.log('user=>',this.$storage.getItem("userInfo"));
      // this.$storage.clearItem("userInfo")
      // this.$storage.clearAll()
    },
  }
</script>

<style scoped>

</style>
