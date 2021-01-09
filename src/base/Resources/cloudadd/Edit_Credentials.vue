<template>
  <div>
    <router-view></router-view>
      <div class="user-container">
      <div class="base-container">
      <div class="form-container">
        <br/>
    <el-row :gutter="20">
          <div class="user-info-list">
            <h2 style="color: darkblue">Edit Credentials</h2>
          </div>
    </el-row>
    <br/>
  
          <el-form :model="editInfo.parameter" ref="editInfo" style="width:100%;" >
            <el-form-item label="channel_id" prop="channelId" label-width="100px"><br/>
              <el-input v-model="editInfo.parameter.channelId" ></el-input>
           </el-form-item>
           <el-form-item label="channel_name" prop="channelName" label-width="100px"><br/>
              <el-input v-model="editInfo.parameter.channelName" ></el-input>
           </el-form-item>
           <el-form-item label="channel_account" prop="channelAccount" label-width="100px"><br/>
            <el-input v-model="editInfo.parameter.channelAccount"></el-input>
            </el-form-item>
          <el-form-item label="channel_access_key" prop="channelAccessKey" label-width="100px"><br/>
              <el-input v-model="editInfo.parameter.channelAccessKey"></el-input>
          </el-form-item>
           <el-form-item label="channel_access_secret" prop="channelAccessSecret" label-width="100px"><br/>
             <el-input v-model="editInfo.parameter.channelAccessSecret"></el-input>
          </el-form-item>
            </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="myPrimary" @click="testAdd('editInfo')">Test</el-button>
            <el-button size="small" type="myPrimary" @click="submitEdit('editInfo')" :disabled="isAble">确定</el-button>
            <el-button size="small" type="myCancel" @click="dialogVisible = false">取消</el-button>
          </div>

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
      editInfo: {
          sessionId: '123',
          version: '1.0',
          osVersion: 'win8',
          parameter: {
            typeName: 'providerAction.update',
            channelId: '',
            channelName: '',
            channelAccount: '',
            channelAccessKey: '',
            channelAccessSecret: ''
          }
        },
      queryInfo: {
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
          typeName: 'providerAction.list',
          userId: '234'
        }
      },
      deleteInfo: {
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
          typeName: 'providerAction.delete',
          channelId: "2"
       }
      },
      userChannels: [],
      dialogTitle: "",
      dialogVisible: false,
      formData: {
        Team: undefined,
        Provider: undefined,
        Name: undefined,
      },
      ProviderOptions: [{
        "label": "Select",
        "value": 1
      }, {
        "label": "AWS",
        "value": 2
      }, {
        "label": "GCP",
        "value": 3
      }, {
        "label": "Azure",
        "value": 4
      }, {
        "label": "Alibaba",
        "value": 5
      }],

        state: store.state,
        isCollapse: false,
        role: null
      }
    },
    created() {
       this.getUserList();
       this.isAble = true;
    },
    methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
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
            channelName: this.editInfo.parameter.channelName,
            channelAccessKey: this.editInfo.parameter.channelAccessKey,
            channelAccessSecret:this.editInfo.parameter.channelAccessSecret
          }
        })
          .then(res => {
            if (res.data.errorCode === '0000') {
            this.$message.success('测试成功');this.isAble = false;}
            else{  this.isAble = true;
            this.$alert(res.data.errorMsg,'警告',{
                confirmButtonClass: "el-button--myPrimary",
                type: "warning"
              })}
        })
      }
      }) 
    },
    async getUserList () {
      const { data: res } = await myPost('/providerAction/list', this.queryInfo)
      this.userChannels = res.result.userChannels
    },
    gotolink(){
      this.$router.push("/Cloud_Credentials/add");
    },
    editClick(row) {
      this.editInfo.parameter.channelId=row.id
      this.editInfo.parameter.channelName=row.channel_name
      this.editInfo.parameter.channelAccount=row.channel_account
      this.editInfo.parameter.channelAccessKey=row.channel_access_key
      this.editInfo.parameter.channelAccessSecret=row.channel_access_secret
      this.dialogTitle = "修改云渠道";
      this.dialogVisible = true;        
      
    },
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          myPost("/providerAction/update" , this.editInfo).then(res =>{
            if (res.data.errorCode === '0000') {
            this.$message.success('修改成功');
            this.dialogVisible = false ;}
            else{
            this.$alert(res.data.errorMsg,'警告',{
                confirmButtonClass: "el-button--myPrimary",
                type: "warning"
              })}
        })
        }
      })
    },
    deleteClick(row){
      this.$confirm("确定要删除该云渠道么?", "提示", {
        confirmButtonClass: "el-button--myPrimary",
        type: "warning"
      })
      .then(() => {
         myPost("/providerAction/delete" , this.deleteInfo).then(res =>{
            if (res.data.errorCode === '0000') {
            this.$message.success('删除成功')}
            else{
            this.$alert(res.data.errorMsg,'警告',{
                confirmButtonClass: "el-button--myPrimary",
                type: "warning"
              })}
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
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
