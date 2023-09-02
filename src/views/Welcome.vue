<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">Hi，您好~ 欢迎使用</div>
      <div class="title">黄阿玛审批后台管理系统</div>
      <div class="desc">——Vue3.0+ElementPlus+Node+Mongo打造审批流通用后台管理系统</div>
    </div>
    <div class="img"></div>
  </div>
</template>

<script >

export default {
  name: 'welcome',
  components: {

  },
}

</script>

<style lang="scss">
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;

  .content {
    position: relative;
    bottom: 40px;

    .sub-title {
      font-size: 40px;
      line-height: 52px;
      color: #333e6b;
    }

    .title {
      font-size: 70px;
      line-height: 90px;
      color: #8A9FF2;
    }

    .desc {
      text-align: right;
      line-height: 50px;
      font-size: 14px;
      color: #b2b9d6;
    }
  }

  .img {
    margin-left: 105px;
    background-image: url('./../assets/images/pleaseSelect.svg');
    width: 500px;
    height: 500px;
    // background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
