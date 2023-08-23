<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">黄阿玛审批后台管理系统</div>
      <div class="desc">——Vue3.0+ElementPlus+Node+Mongo打造审批流通用后台管理系统</div>
    </div>
    <div class="img"></div>
  </div>
</template>

<script >
export default {
  name: 'welcome'
}

</script>

<style lang="scss">
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .content {
    position: relative;
    bottom: 40px;
    .sub-title{
      font-size: 40px;
      line-height: 52px;
      color: #333;
    }
    .title{
      font-size: 50px;
      line-height: 72px;
      color: #1388fd;
    }
    .desc{
      text-align: right;
      line-height: 40px;
      font-size: 14px;
      color: #999;
    }
  }
  .img {
    margin-left: 105px;
    background-image: url('./../assets/images/welcome.png');
    width: 371px;
    height: 438px;
  }
}
</style>
