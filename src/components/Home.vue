<template>
  <div class="basic-layout">
    <!-- 导航栏 -->
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <div class="logo">
        <img src="./../assets/images/logoBird.png" alt="">
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu :default-active="activeMenu" background-color="#4C5DA1" text-color="#fff" router :collapse="isCollapse"
        class="nav-menu">
        <TreeMenu :userMenu="userMenu" />
      </el-menu>
    </div>
    <!-- 右侧内容 -->
    <div :class="['content-right',
      isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <nav class="nav-left">
          <!-- 导航栏收缩展开按钮 -->
          <div class="menu-fold" @click="toggle">
            <el-icon>
              <Fold />
            </el-icon>
          </div>
          <div class="bread">
            <BreadCrumb />
          </div>
        </nav>
        <div class="user-info">
          <el-badge :is-dot="noticeCount > 0 ? true : false" class="bell">
            <el-icon>
              <Bell />
            </el-icon>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-dropdown-link">
              <div>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <el-icon class="user-icon-right">
                  <arrow-down />
                </el-icon>
              </div>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">
                  邮箱：{{ userInfo.userEmail }}
                </el-dropdown-item>
                <el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <!-- 承接页面 -->
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script >
import TreeMenu from '@/components/TreeMenu.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
export default {
  name: 'Home',
  components: { TreeMenu, BreadCrumb },
  data() {
    return {
      isCollapse: false, // 侧边栏伸缩
      userInfo: this.$store.state.userInfo,
      // noticeCount: 0, // 右上角小铃铛红点，0没有红点，>=1有红点
      userMenu: [],  // 菜单
      activeMenu: location.hash.slice(1)
    }
  },
  computed: {
    noticeCount() {
      return this.$store.state.noticeCount;
    },
  },
  mounted() {
    this.getNoticeCount()
    this.getMenuList()
  },
  methods: {
    // 控制菜单伸缩
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    // 点击头像
    handleLogout(key) {
      if (key == "email") return
      this.$store.commit("saveUserInfo", "")
      this.userInfo = {}
      this.$router.push("/login")
    },
    async getNoticeCount() {
      try {
        const count = await this.$api.noticeCount()
        this.getNoticeCount = count
      } catch (error) {
        console.error(error)
      }
    },
    async getMenuList() {
      try {
        const { menuList, actionList } = await this.$api.getPermissionList()
        this.userMenu = menuList
        this.$store.commit("saveUserMenu", menuList)
        this.$store.commit("saveUserAction", actionList)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss">
.basic-layout {
  position: relative;

  .nav-side {
    // 固定定位
    position: fixed;
    width: 250px;
    // 自动计算属性,自动计算高度
    height: 100vh;
    // 项目的主题色
    background-color: #4c5da1;
    color: #fff;
    // 自动出现滚动条
    overflow-y: auto;
    // 打开或者收起宽度有一个过度效果
    transition: width 0.5s;

    .title-size {
      font-size: 18px;
    }

    .logo {
      display: flex;
      align-items: center;
      font-size: 20px;
      height: 5%;

      img {
        margin: 0 20px;
        width: 35px;
        height: 35px;
      }
    }

    .nav-menu {
      // height: calc(100vh - 60px);
      border-right: none;
    }

    // 合并
    &.fold {
      width: 75px;
    }

    // 展开
    &.unfold {
      width: 250px;
    }
  }

  .content-right {
    margin-left: 250px;
    transition: width 1s;

    &.fold {
      margin-left: 75px;
    }

    &.unfold {
      margin-left: 250px;
    }

    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      // 左右结构,flex布局，两端对齐
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      font-size: 18px;

      .nav-left {
        display: flex;
        align-items: center;

        .menu-fold {
          padding-right: 20px;
          line-height: 20px;
          font-size: 25px;
          cursor: pointer;
        }
      }

      .user-info {
        .bell {
          line-height: 30px;
          margin-right: 20px;
          cursor: pointer;
        }

        .user-dropdown-link {
          margin-right: 20px;
          cursor: pointer;

          .user-icon-right {
            // position: fixed;
            // bottom: 100px;
            margin-left: 10px;
          }
        }

      }
    }

    .wrapper {
      background-color: #eef0f3;
      padding: 20px;
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
