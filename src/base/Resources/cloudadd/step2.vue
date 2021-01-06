<template>
  <div>
    <router-view></router-view>
      <div class="user-container">
      <div class="base-container">
      <div class="form-container">
    <el-row :gutter="20">
      <el-col>
          <div class="user-info-list">
            <h2 style="color: darkblue">Add Credentials</h2>
          </div>
          <div class="user-info"></div>
     
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
  <el-form-item label="channel_name" prop="channel_name" label-width="100px"><br/>
    <el-input v-model="ruleForm.channel_name" ></el-input>
  </el-form-item>
  <el-form-item label="channel_account" prop="channel_account" label-width="100px"><br/>
    <el-input v-model="ruleForm.channel_account"></el-input>
  </el-form-item>
  <el-form-item label="channel_access_key" prop="channel_access_key" label-width="100px"><br/>
    <el-input v-model="ruleForm.channel_access_key"></el-input>
  </el-form-item>
  <el-form-item label="channel_access_secret" prop="channel_access_secret" label-width="100px"><br/>
    <el-input v-model="ruleForm.channel_access_secret"></el-input>
  </el-form-item>
  </el-form> 

          <el-col :span="24" style="text-align:center">
             Need help?
             <a class="need-help-section__link" href="http://www.baidu.com" data-ng-click="ctrl.inviteAdminClicked()" translate-once="INVITE_YOUR_CLOUD_ADMIN">Invite your cloud admin</a>
             or
             <a class="need-help-section__link" href="http://www.baidu.com" data-ng-click="ctrl.inviteAdminClicked()" translate-once="INVITE_YOUR_CLOUD_ADMIN">Contact us</a>
          
          </el-col>
      </el-col>
    </el-row>

    </div>
    </div>
  </div>

  </div>
</template>

<script>
/* 从菜单复制来的 加入路由跳转   */
import store from '@/utils/store'

  export default {
    data() {
      return {
        state: store.state,
        isCollapse: false,
        role: null,
        ruleForm: {
        channel_name: '',
        channel_account: '',
        channel_access_key: '',
        channel_access_secret: ''
      },
      // 添加表单的验证规则对象
      rules: {
        channel_name: [
          { required: true, message: '请输入channel_name', trigger: 'blur' }
        ],
        channel_account: [
          { required: true, message: '请输入channel_account', trigger: 'blur' }
        ],
        channel_access_key: [
          { required: true, message: '请输入channel_access_key', trigger: 'blur' }
        ],
        channel_access_secret: [
          { required: true, message: '请输入channel_access_secret', trigger: 'blur' }
        ]
      },
      }
    },
    created() {
      this.role = JSON.parse(sessionStorage.getItem('accountInfo')).role
    },
    methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    
    step2(){
      //跳转到上一次的页面
      //this.$router.go(-1)
      
      //指定跳转的地址
      //this.$router.replace('Cloud_Credentials/add/step1')
 
      //指定跳转路由的名字下
      //this.$router.replace({name:'Cloud_Credentials/add/step1'})
 
      //通过push进行跳转
      this.$router.push({ path: "/Cloud_Credentials/add/step2" ,name:"step2"});
      //this.$router.push({name:'/learn'})
    }
    },
  }
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-top: 0px;
  margin-bottom: 0px;
  height: 100%;
  width: 100%;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

a {
    text-decoration: none;
    color: #0072bc;
    }
</style>
