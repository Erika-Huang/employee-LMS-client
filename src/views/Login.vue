<template>
  <div class="login-wrapper">
    <!-- 弹框 -->
    <div class="modal">
      <!-- 表单 -->
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <div class="logo">
          <img src="./../assets/images/cat1.svg" alt="">
        </div>
        <el-form-item prop="userName">
          <el-input type="text" placeholder=" account number" prefix-icon="User" size="large" v-model="user.userName" />
        </el-form-item>

        <el-form-item prop="userPwd">
          <el-input type="password" placeholder=" password" size="large" prefix-icon="Lock" v-model="user.userPwd" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login" size="large">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import storage from './../utils/storage'
// 导入需要的icon
export default {
  name: 'login',
  components: {
  },
  data() {
    return {
      user: {
        userName: 'admin',
        userPwd: 'admin'
      },
      rules: {
        userName: [
          {
            required: true, message: "请输入用户名", trigger: 'blur'
          }
        ],
        userPwd: [
          {
            required: true, message: "请输入密码", trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {

    login() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 调用登录接口
          this.$api.login(this.user).then(async (res) => {
            this.$store.commit('saveUserInfo', res)
            await this.loadAsyncRoutes()
            this.$router.push('/welcome')
          })
        } else {
          return false;
        }
      })
    },
    async loadAsyncRoutes() {
      let userInfo = storage.getItem('userInfo') || {}
      if (userInfo.token) {
        try {
          const { menuList } = await this.$api.getPermissionList()
          let routes = utils.generateRoute(menuList)
          routes.map(route => {
            let url = `./../views/${route.component}.vue`
            route.component = () => import(url);
            this.router.addRoute("home", route);
          })
        } catch (error) {

        }
      }
    },
    goHome() {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style lang="scss">
/* a {
  color: #42b983;
} */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7a8bce;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .modal {
    width: 500px;
    padding: 60px;
    border-radius: 7px;

    ::placeholder {
      font-size: 17px;
    }

    .logo {
      margin-bottom: 400px;
      position: relative;

      img {
        position: absolute;
        overflow: hidden;
        left: -220px;
        bottom: -560px;
        width: 800px;
        height: 1500px;
      }
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>