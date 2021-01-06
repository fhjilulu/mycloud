<template>
    <div>
      <div class="user-container">
      <div class="base-container">
      <div class="form-container">
      <el-card>
        <el-row>
            <el-col :span="4" :offset="20">
                <el-button type="primary" @click="addDialogVisible = true">云厂商授权添加</el-button>
            </el-col>
        </el-row>
           <!-- 导航 -->
        <el-table
      :data="userChannels"
      style="width: 100%" stripe>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="80">
      </el-table-column>

      <el-table-column
        prop="org_id"
        label="org_id"
        width="140">
      </el-table-column>

      <el-table-column
        prop="channel_name"
        label="channel_name"
        width="140">
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

      </el-table>
      </el-card>

    <el-dialog
  title="云厂商授权添加"
  :visible.sync="addDialogVisible"
  width="50%"
  @close="addDialogClosed">

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="channel_name" prop="channel_name">
    <el-input v-model="ruleForm.channel_name"></el-input>
  </el-form-item>
  <el-form-item label="channel_account" prop="channel_account">
    <el-input v-model="ruleForm.channel_account"></el-input>
  </el-form-item>
  <el-form-item label="channel_access_key" prop="channel_access_key">
    <el-input v-model="ruleForm.channel_access_key"></el-input>
  </el-form-item>
  <el-form-item label="channel_access_secret" prop="channel_access_secret">
    <el-input v-model="ruleForm.channel_access_secret"></el-input>
  </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addForms">确 定</el-button>
  </span>
</el-dialog>
    </div>
    
    </div>
    </div>
  </div>
</template>

<script>
import { myGet,myPost,login } from "@/api/http";
export default {
  data () {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
          typeName: 'providerAction.list',
          userId: '234'
        }
      },
      userChannels: [],
      addDialogVisible: false,
      ruleForm: {
        channel_name: '',
        channel_account: '',
        channel_access_key: '',
        channel_access_secret: ''
      },
      // 添加表单的验证规则对象
      rules: {
        channel_name: [
          { requored: true, message: '请输入channel_name', trigger: 'blur' }
        ],
        channel_account: [
          { requored: true, message: '请输入channel_account', trigger: 'blur' }
        ],
        channel_access_key: [
          { requored: true, message: '请输入channel_access_key', trigger: 'blur' }
        ],
        channel_access_secret: [
          { requored: true, message: '请输入channel_access_secret', trigger: 'blur' }
        ]
      },
      loading: true
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await myPost('/providerAction/list', this.queryInfo)
      this.userChannels = res.result.userChannels
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addForms () {
      this.$refs.addFormRef.validate(valid => {
        console.log(valid)
      })
    }
  }
}

</script>

<style scoped>
.pmc-scheduling-main-slide__header-title {
    font-family: MonserratR,Arial,Helvetica,sans-serif;
    font-size: 24px;
    line-height: 26px;
    color: #1275b8;
}

.input-with-select{
    background-color: #fff;
}

.bg-purple {
    background: #fff;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.sub-menu {
  height: 10px;
  line-height: 10px;
  font-size: 20px;
  width: 140px;
  font-size: 10px;
}

.line{
   width: 100%;
   height: 2px;
   background-color:#222c32;
}

.el-menu--horizontal > .el-menu-item {
  border-bottom: none;
  background-color: #fff;
  height: 30px;
  line-height: 30px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
  background-color: #fff !important;
}
</style>
