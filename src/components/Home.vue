<template>
  <!-- 基本布局 -->
  <div class="basic-layout">
    <!-- 导航栏 -->
    <div class="nav-side"></div>
    <!-- 右侧内容 -->
    <div class="content-right">
      <!-- 面包屑 -->
      <div class="nav-top">
        <div class="bread">面包屑</div>
        <div class="user">用户</div>
      </div>
      <!-- 承接页面 -->
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
  export default{
    name: 'Home'
  }
</script>

<style lang="scss">
.basic-layout{
  position: relative;
  .nav-side{
    // 固定定位
    position: fixed;
    width: 200px;
    // 自动计算属性,自动计算高度
    height: 100vh;
    // 项目的主题色
    background-color: #2184FF;
    color: #fff;
    // 自动出现滚动条
    overflow-y: auto;
    // 打开或者收起宽度有一个过度效果
    transition: width .5s;
  }
  .content-right{
    margin-left:200px;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      // 左右结构,flex布局，两端对齐
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;

    }
    .wrapper{
      background-color: #eef0f3;
      padding:20px;
      // box-sizing 盒模型是border-box，padding值是不会计算在内的，wapper的宽高是包含padding值的，所以减去50px就好
      height: calc(100vh - 50px);
      .main-page {
        background-color: #fff;
        height: 100%;
      }
    }
  }
}
</style>
