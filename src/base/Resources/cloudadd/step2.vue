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
       </el-col>
    </el-row>

<el-row :gutter="20">
  <el-col>
  <el-col :span="3" > <br/> </el-col>
      <el-col :span="12" >
<el-form :model="ruleForm.parameter" :rules="rules" ref="ruleForm" style="width:100%;" class="demo-ruleForm">
  <el-form-item label="channel_name" prop="channelName" label-width="100px"><br/>
    <el-input v-model="ruleForm.parameter.channelName" ></el-input>
  </el-form-item>
  <el-form-item label="channel_account" prop="channelAccount" label-width="100px"><br/>
    <el-input v-model="ruleForm.parameter.channelAccount"></el-input>
  </el-form-item>
  <el-form-item label="channel_access_key" prop="channelAccessKey" label-width="100px"><br/>
    <el-input v-model="ruleForm.parameter.channelAccessKey"></el-input>
  </el-form-item>
  <el-form-item label="channel_access_secret" prop="channelAccessSecret" label-width="100px"><br/>
    <el-input v-model="ruleForm.parameter.channelAccessSecret"></el-input>
  </el-form-item>
  </el-form> </el-col>
  <el-col :span="2" > <br/> </el-col>
    <el-col :span="7" ><br/><br/>
      <el-button type="primary" size="medium" @click="testAdd('ruleForm')">Test</el-button><br/><br/><br/><br/>
      <el-button type="primary" size="medium" @click="gotolink">Back</el-button><br/><br/><br/><br/>
      <el-button :disabled="isAble" type="primary" size="medium" @click="submitAdd('ruleForm')">Finish</el-button>
      </el-col></el-col></el-row>

    <el-row :gutter="20">
      <el-col>
          <el-col :span="24" style="text-align:center">
            测试结果：{{testresult}}<br/><br/>
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
import { myGet,myPost,login } from "@/api/http";
import store from '@/utils/store'

  export default {
    data() {
      return {
        testresult:'还未测试',
        ruleForm: {
          sessionId: '123',
          version: '1.0',
          osVersion: 'win8',
          parameter: {
            typeName: 'providerAction.input',
            channelName: '',
            channelAccount: '',
            channelAccessKey: '',
            channelAccessSecret: ''
          }
        },
      // 添加表单的验证规则对象
      rules: {
        channelName: [
          { required: true, message: '请输入channelName', trigger: 'blur' }
        ],
        channelAccessKey: [
          { required: true, message: '请输入channelAccessKey', trigger: 'blur' }
        ],
        channelAccessSecret: [
          { required: true, message: '请输入channelAccessSecret', trigger: 'blur' }
        ]
      },
      }
    },
    
    created() {
      this.isAble = true;
    },
    
    methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    submitAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          myPost("/providerAction/input",this.ruleForm ).then(res =>{
            if (res.data.errorCode === '0000') {
            this.$message.success('添加成功')}
            else{
            this.$alert(res.data.errorMsg,'警告',{
                confirmButtonClass: "el-button--myPrimary",
                type: "warning"
              })}
        })
        }})},
    testAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          myPost("/providerAction/test", 
          {
          sessionId: '123',
          version: '1.0',
          osVersion: 'win8',
          parameter: {
            typeName: 'providerAction.test',
            channelName: this.ruleForm.parameter.channelName,
            channelAccessKey: this.ruleForm.parameter.channelAccessKey,
            channelAccessSecret:this.ruleForm.parameter.channelAccessSecret
          }
        })
          .then(res => {
            if (res.data.errorCode === '0000') {
            this.$message.success('测试成功');this.testresult="测试成功";this.isAble = false;}
            else if (res.data.errorCode === '2001'){
            this.$message.success('channelName不能为空');this.testresult="channelName不能为空";this.isAble = true;}
            else if (res.data.errorCode === '2003'){
            this.$message.success('渠道AccessKey不能为空');this.testresult="渠道AccessKey不能为空";this.isAble = true;}
            else if (res.data.errorCode === '2004'){
            this.$message.success('渠道AccessSecret不能为空');this.testresult="渠道AccessSecret不能为空";this.isAble = true;}
            else if (res.data.errorCode === '2005'){
            this.$message.success('不支持的云厂商');this.testresult="不支持的云厂商";this.isAble = true;}
            else if (res.data.errorCode === '2008'){
            this.$message.success('请检查渠道AccessKey或AccessSecret是否正确');this.testresult="请检查渠道AccessKey或AccessSecret是否正确";this.isAble = true;};
          });
        }
      }) 
    },
    gotolink(){
      //跳转到上一次的页面
      //this.$router.go(-1)
      
      //指定跳转的地址
      //this.$router.replace('Cloud_Credentials/add/step1')
 
      //指定跳转路由的名字下
      //this.$router.replace({name:'Cloud_Credentials/add/step1'})
 
      //通过push进行跳转
      this.$router.push({ path: "/Cloud_Credentials/add/step1" ,name:"step1"});
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
