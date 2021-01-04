<template>
  <div class="head-container">
    <div class="left-part">
      <hamberger :toggle-click="flagClick" :is-active="!state.isCollapse" class="hamburger-container"></hamberger>
      <breadcrumb></breadcrumb>
    </div>

    <el-dialog
       title="How can we improve ParkMyCloud?"
       :visible.sync="dialogVisible"
       width="30%"
       :before-close="handleClose">
       <textarea class="diaInput" v-model="textarea" placeholder="请输入 ... "></textarea>
         <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
       </span>
    </el-dialog>

    <div class="account-list">
      <div>
        <el-dropdown>
          <el-tooltip content="Open User Guide for this feature" effect="dark" placement="bottom">
            <el-button
            type="text"
            icon="el-icon-question"
            plain
            @click="goTarget('https://parkmycloud.atlassian.net/wiki/x/nsgC')">
            </el-button>
          </el-tooltip>
        </el-dropdown>
        <el-dropdown>
          <el-tooltip content="Feedback-How can we improve ParkMyCloud?" effect="dark" placement="bottom">
            <el-button
            type="text"
            icon="el-icon-message"
            plain
            @click="dialogVisible = true">
            </el-button>
          </el-tooltip>
        </el-dropdown>
        <el-dropdown>
          <el-tooltip content="Open User Guide for this feature" effect="dark" placement="bottom">
            <el-button
            type="text"
            icon="el-icon-bell"
            plain
            @click="goTarget('https://parkmycloud.atlassian.net/wiki/x/xyN_AQ')">
            </el-button>
          </el-tooltip>
        </el-dropdown>
        <el-dropdown>
          <div class="pic-container">
            <!-- <div class="avatar">              
            </div> -->
            <span style="cursor: pointer;">{{nickname}}</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click.stop="logOut()">退出登录</span></el-dropdown-item>
            <!-- <el-dropdown-item><span @click.stop="changePassword()">修改密码</span></el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>

        
      </div>

    </div>
    
  </div>
</template>

<script>
import {myPost} from '@/api/http'
import store from '@/utils/store'
import breadcrumb from '@/components/layout/breadcrumb'
import hamberger from '@/components/hamberger/hamberger'
import HelpDoc from '@/components/helpdoc'

export default {
  data() {
    var checkconfirmPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("确认密码不能为空"));
      }
      if (value!==this.passForm.password) {
        callback(new Error("确认密码必须与新密码一致"))
      }
      else {
        callback();
      }
    }
    return {
      seconds: 30,
      state: store.state,
      isCollapse: false,
      passVisible: false,
      codeShow: true,
      restTime: 60,
      nickname: '',
      dialogVisible: false
    }
  },
  mounted () {
  this.add()
},
  components: {breadcrumb,hamberger,HelpDoc},
  created(){
    this.nickname = JSON.parse(sessionStorage.getItem('accountInfo')).nickname
  },
  methods:{
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
   },
    goTarget(href) {
      window.open(href, "_blank");
    },
    flagClick() {
      this.isCollapse = !this.isCollapse
      if(this.isCollapse) {
        store.setAsideWidthAction('64px')
      }
      else {
        store.setAsideWidthAction('180px')
      }
      store.setCollapseAction(this.isCollapse)
    },
    logOut(){
      this.$confirm('是否退出登录?', '提示', {
      confirmButtonClass: "el-button--myPrimary",
      type: 'warning'
      })
      .then(() => {
        this.$message({
        type: 'success',
        message: '退出登录成功，请重新登录!'
        })
        this.$router.push({ path: '/login' })
      })
      .catch(() => {
        this.$message({
        type: 'info',
        message: '已取消退出登录'
        }) 
      })
    }
  },
  computed: {
  second: function () {
    return this.num(this.seconds)
  },
}
}
</script>

<style scoped>
  .head-container {
    height: 100%;
    width: 100%;
    /* background-color: #0AAFE7; */
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hamburger-container {
    /* line-height: 46px; */
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
  }
  .hamburger-container:hover {
    background: rgba(0, 0, 0, .025)
  }
  .left-part {
    width: 50%;
    display: flex;
  }
  .diaInput{
    height: 200px;
    width: 100%;
  }
  .account-list {   
    height: 40px;
    /* width: 400px; */
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .account-list li {
    padding-left: 15px;
  }
  .account-list li:last-child {
    padding-right: 15px;
  }
  .account-list li p{
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
  }
  .avatar,.avatar img {
    height: 36px;
    width: 36px;
  }
  .avatar {
    border-radius: 50%;
    overflow: hidden;
    position: relative;
  }
  .item {
    height: 40px;
  }
  .bell-icon {
    margin-top: 7px;
  }
  .notice {
    padding-right: 15px;
  }
  .notice,.avatar,.power-item {
    cursor: pointer;
  }
  .logo-list {
    width: 100%;
    height: 100%;
    padding: 0 20px 0 180px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    /* width: 50px; */
    height: 40px;
    overflow: hidden;
    /* background-color: #0AAFE7; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo img {
    height: 35px;
  }
  .pic-container {
    display: flex;
  }
  .el-icon-arrow-down {
    font-size: 12px;
    color: #333;
    font-weight: 600;
    position: absolute;
    top: 6px;
    right: -12px;
  }
</style>

<style>
  .el-badge__content.is-fixed {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .head-container .el-input-group__append .code {
    color: #0090FF;
  }
</style>
