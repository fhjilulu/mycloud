<template>
  <div class="login-container">
    <div class="top-part1"><h2 style="color:rgb(255, 255, 255)">云酬</h2></div>
    <body>
    <div class="top-part2"><h3 style="color:rgb(255, 255, 255)" :sm="48" :lg="48">
      Sign In To My Account</h3></div>
      <br/><br/><br/>
        <div class="middle-part">
        <div class="login-form-container" >
          <el-form class="login-form first" :model="loginForm" ref="loginForm">
            <el-form-item prop="username">
              <svg-icon icon-class="login" class="icon-opera"></svg-icon><el-input type="text"  placeholder="请输入账号" v-model="loginForm.parameter.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <svg-icon icon-class="password" class="icon-opera"></svg-icon><el-input type="password"  placeholder="请输入密码" v-model="loginForm.parameter.password"></el-input>
            </el-form-item>
            <el-form-item class="login-button">
              <el-button style="width:100%" type="myPrimary"  @click="userLogin('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { myGet,myPost,login } from "@/api/http";
export default {
  data() {
    return {
      loginForm:{
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
          typeName: 'loginAction.login',
          userName: '234',
          password: '456'
        }
      },
    };
  },
  created() {
    sessionStorage.removeItem('Token')
    sessionStorage.setItem('isLogin',false)
  },
  methods: {
    // 登录
    userLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          login('/loginAction/login',this.loginForm)
          .then(res => {
            if (res.data.errorCode === '0000') {
            // 登录成功
            this.$message.success('登陆成功')
            // 1.登录成功后 服务端返回的token保存到sessionStorace中
            window.sessionStorage.setItem('token', res.date);
            sessionStorage.setItem('isLogin',true); 
            sessionStorage.setItem('userId', formName.userName)
            // 1.1项目中除了登录之外的其他api接口，必须在登录之后才能访问
            // 1.2token只应在当前网站的打开期间有效，所以将token存储在sessionStorace中
            // 2.通过编程式导航跳转到后台主页，路由地址/home
            this.$router.push('/Resources');
          } 
          //else {
          //  this.$message.error('登录失败')
          //}
           else {
              this.$alert(res.data.errorMsg,'警告',{
                confirmButtonClass: "el-button--myPrimary",
                type: "warning"
              })
            }
          })
        }
      }) 
    }
  }

};
</script>

<style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0px 0 0px;
    margin: 0;
    box-sizing: border-box;
  }
  .role_box {
    padding-left: 40px;
  }

  .top-part1 {
    width: 100%;
    height: auto;
    padding: 10px 0 10px;
    margin: 0;
    box-sizing: border-box;
    background-color: #051f92;
  }
  .top-part2 {
    width: 100%;
    height: 60px;
    padding: 10px 0 10px;
    margin: 0;
    box-sizing: border-box;
    background-color: #1275b8;
  }
  header {
    height: 104px;
    position: relative;
    color: #fff;
    background-color: #1275b8;
  }
  .middle-part {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login-form-container {
    /* position: relative; */
    background-color: #fff;
    z-index: 999;
    width: 400px;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 10px 30px 30px 10px rgba(0, 0, 0, 0.5);
  }
  .login-form {
    margin-top: 50px;
  }
  .bottom-part {
    font-size: 12px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bottom-part span {
    line-height: 20px;
  }
  /* .login-form {
    padding-right: 20px;
    border-right: 1px dashed #979797;
  } */
  .login-button {
    margin-top: 65px;
  }
  p {
    text-align: center;
    font-weight: 600;
    color: #0462BA;
  }
</style>
<style>
  .login-container .first .el-input__inner {
    border-left: 0px solid #fff;
    border-right: 0px solid #fff;
    border-top: 0px solid #fff;
    border-bottom: 1px solid #e5e5e5;
    border-radius: 0px;
  }
  .login-container .el-form-item__content {
    display: flex;
    align-items: center;
  }
</style>
