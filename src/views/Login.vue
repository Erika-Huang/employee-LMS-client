<template>
  <div class="login-wrapper">
    <!-- 弹框 -->
    <div class="modal">
      <!-- 表单 -->
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <!-- S标题 -->
        <div class="title">登录</div>
        <!-- E标题 -->
        <el-form-item prop="userName">
          <el-input type="text" prefix-icon="el-icon-user" v-model="user.userName"/>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="password" prefix-icon="el-icon-view" v-model="user.userPwd"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data(){
      return {
        user:{
          userName:'',
          userPwd:''
        },
        rules:{
          userName: [
            {
              required:true, message:"请输入用户名",trigger:'blur'
            }
          ],
          userPwd: [
            {
              required:true, message:"请输入密码",trigger:'blur'
            }
          ]
        }
      }
    },
    methods: {
      login() {
        this.$refs.userForm.validate((valid)=>{
          if(valid){
            // 调用登录接口
            this.$api.login(this.user).then((res)=> {
              this.$store.commit('saveUserInfo',res)
              this.$router.push('/welcome')
            })
          }else{
            return false;
          }
        })
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
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 7px;
    box-shadow: 0px 0px 9px 1px #c7c9cb9d;
    .title {
      font-size: 30px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>