<template>
  <div>
    <router-view></router-view>
      <div class="user-container">
      <div class="base-container">
      <div class="form-container">
        <br/>
    <el-row :gutter="20">
      <el-col :span="19">
          <div class="user-info-list">
            <h2 style="color: darkblue">Cloud Credentials</h2>
          </div>
      </el-col>
      <el-col :span="5" >
          <el-button type="primary" size="medium" @click="gotolink">Add Cloud Credentials</el-button>
      </el-col>
      <!--
      <el-col :span="6">
          <el-select  v-model="formData.Provider" placeholder="Filter" clearable :style="{width: '100%'}">
            <el-form  ref="filter" :model="formData" size="mini" label-width="100px">
            <el-form-item label="Team" prop="Team">
                <el-input v-model="formData.Team" clearable :style="{width: '90%'}"></el-input>
            </el-form-item>
            <el-form-item label="Provider" prop="Provider">
                <el-select v-model="formData.Provider" placeholder="Select" clearable :style="{width: '90%'}">
                  <el-option v-for="(item, index) in ProviderOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Name" prop="Name">
                <el-input v-model="formData.Name" clearable :style="{width: '90%'}"></el-input>
            </el-form-item>
           <el-option>
           <el-form-item size="large">
             <el-button type="primary" @click="submitForm">Search</el-button>
             <el-button type="text" icon="el-icon-close" @click="resetForm">Close</el-button>
           </el-form-item>
           </el-option>
         </el-form>
     </el-select>
      </el-col>-->

    </el-row>
    <br/>
   <el-table
      :data="userChannels"
      style="width: 100%" stripe>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="40">
      </el-table-column>

      <el-table-column
        prop="org_id"
        label="org_id"
        width="70">
      </el-table-column>

      <el-table-column
        prop="is_disable"
        label="is_disable"
        width="90">
        <template slot-scope="scope">
                <span v-if="scope.row.is_disable===0">Enable</span>
                <span v-if="scope.row.is_disable===1">Disable</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="channel_name"
        label="channel_name"
        width="130">
      </el-table-column>

      <el-table-column
        prop="channel_account"
        label="channel_account"
        width="160">
      </el-table-column>

      <el-table-column
        prop="channel_access_key"
        label="channel_access_key"
        width="220">
      </el-table-column>

      <el-table-column
        prop="channel_access_secret"
        label="channel_access_secret"
        width="220">
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" min-width="100px">
              <template slot-scope="scope">
                <el-button type="text" size="mini" class="color-green" @click="editClick(scope.row)">修改</el-button>
                <el-button type="text" size="mini" class="color-red" @click="deleteClick(scope.row)">删除</el-button>
              </template>
            </el-table-column>

      </el-table>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" top="10vh" :close-on-click-modal="false" width="500px">
          <el-form :model="editInfo.parameter" ref="editInfo" style="width:100%;" >
            <el-form-item label="channel_id" prop="channelId" label-width="150px">
              <el-input v-model="editInfo.parameter.channelId" ></el-input>
           </el-form-item>
           <el-form-item label="channel_name" prop="channelName" label-width="150px">
              <el-input v-model="editInfo.parameter.channelName" ></el-input>
           </el-form-item>
           <el-form-item label="channel_account" prop="channelAccount" label-width="150px">
            <el-input v-model="editInfo.parameter.channelAccount"></el-input>
            </el-form-item>
          <el-form-item label="channel_access_key" prop="channelAccessKey" label-width="150px">
              <el-input v-model="editInfo.parameter.channelAccessKey"></el-input>
          </el-form-item>
           <el-form-item label="channel_access_secret" prop="channelAccessSecret" label-width="150px">
             <el-input v-model="editInfo.parameter.channelAccessSecret"></el-input>
          </el-form-item>           
           <el-form-item label="channel_is_disable" prop="isdisable" label-width="150px">
                   <el-switch
                     v-model="editInfo.parameter.isdisable"
                     :active-value="1"
                     :inactive-value="0">
                   </el-switch>
           </el-form-item>
            </el-form>
          <div slot="footer" class="dialog-footer">
            <!--<el-button size="small" type="myPrimary" @click="testAdd('editInfo')">Test</el-button>
            --><el-button size="small" type="myPrimary" @click="submitEdit('editInfo')">确定</el-button>
            <el-button size="small" type="myCancel" @click="dialogVisible = false">取消</el-button>
          </div>
        </el-dialog>

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
            channelAccessSecret: '',
            isdisable:''
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
      ableform: {
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
          typeName: 'providerAction.enable',
          channelId: ''
        }
      },      
      disableform: {
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
          typeName: 'providerAction.disable',
          channelId: ''
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
      this.ableform.parameter.channelId=row.id
      this.disableform.parameter.channelId=row.id
      this.editInfo.parameter.isdisable=row.is_disable
      this.dialogTitle = "修改云渠道";
      this.dialogVisible = true;        
      
    },
    submitEdit(formName) {
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
          myPost("/providerAction/update" , this.editInfo).then(res =>{
            if (res.data.errorCode === '0000') {
              if (this.editInfo.parameter.isdisable===0) 
                 {myPost("/providerAction/enable" , this.ableform).then(res =>{
                     if (res.data.errorCode === '0000' || res.data.errorCode === '2011') {
                           this.$message.success('修改成功');
                           this.getUserList();
                           this.dialogVisible = false ;}
                    else{
                    this.$alert(res.data.errorMsg,'警告',{
                     confirmButtonClass: "el-button--myPrimary",
                     type: "warning"
                    })}
                   })
                 }
             else if(this.editInfo.parameter.isdisable===1) 
                 {myPost("/providerAction/disable" , this.disableform).then(res =>{
                     if (res.data.errorCode === '0000') {
                           this.$message.success('修改成功');
                           this.getUserList();
                           this.dialogVisible = false ;}
                    else{
                    this.$alert(res.data.errorMsg,'警告',{
                     confirmButtonClass: "el-button--myPrimary",
                     type: "warning"
                    })}
                   })
                 } 
            }     
          else{
            this.$alert(res.data.errorMsg,'警告',{
                confirmButtonClass: "el-button--myPrimary",
                type: "warning"
              })}
        })
      }
        else{
            this.$alert(res.data.errorMsg,'警告',{
                confirmButtonClass: "el-button--myPrimary",
                type: "warning"
              })}        
      })}       
    })},
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
