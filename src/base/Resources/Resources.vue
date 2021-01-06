<template>
    <div>
      
      <div class="user-container">
      <div class="base-container">
      <div class="form-container">

      <br/>
          <div class="user-info-list">
            <h2 style="color: darkblue">云资源列表</h2>
          </div>
          <br><br>

           <!-- 导航 -->
    <el-tabs type="border-card">
      <el-tab-pane label="云资源">
        <el-table
      :data="instanceList"
      style="width: 100%">

      <el-table-column
        prop="id"
        label="id"
        width="50">
      </el-table-column>

      <el-table-column
        prop="channel_id"
        label="channel_id"
        width="100">
      </el-table-column>

      <el-table-column
        prop="location"
        label="location"
        width="100">
      </el-table-column>

      <el-table-column
        prop="status"
        label="status"
        width="100">
        <template slot-scope="scope">
          <el-switch
          @change='statuschange($event, scope.row, startSingleInstance, stopSingleInstance)'
          v-model="scope.row.status"
          active-value="R"
          inactive-value="S">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column
        prop="team"
        label="team"
        width="100">
      </el-table-column>

      <el-table-column
        prop="credential"
        label="credential"
        width="100">
      </el-table-column>

      <el-table-column
        prop="channel_name"
        label="channel_name"
        width="140">
      </el-table-column>

      <el-table-column
        prop="channel_instance_id"
        label="channel_instance_id"
        width="230">
      </el-table-column>

      <el-table-column
        prop="channel_cost"
        label="channel_cost"
        width="140">
      </el-table-column>
      </el-table>
      </el-tab-pane>
    </el-tabs>
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
          typeName: 'instanceAction.list',
          userId: '234',
          pageNo: '1',
          pageSize: '10'
        }
      },
      startSingleInstance: {
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
          typeName: 'instanceAction.startSingleInstance',
          instanceId: '5'
        }
      },
      stopSingleInstance: {
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
          typeName: 'instanceAction.stopSingleInstance',
          instanceId: '5'
        }
      },
      instanceList: [],
      totalCount: 0,
      scheduleList: [],
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        Schedulename: '',
        Description: '',
        Timezone: '',
        Numberofresources: ''

      },
      // 添加表单的验证规则对象
      addFormRules: {
        ParkingScheduleName: [
          { requored: true, message: '请输入', trigger: 'blur' }
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
      const { data: res } = await myPost('/instanceAction/list', this.queryInfo)
      this.instanceList = res.result.instanceList
      this.totalCount = res.result.totalCount
    },
    async statuschange (callback, row, startSingleInstance, stopSingleInstance) {
      if (callback === 'S') {
        stopSingleInstance.parameter.instanceId = row.id
        const { data: res } = await myPost('/instanceAction/stopSingleInstance', this.stopSingleInstance)
        if (res.errorCode === '0000') {
          return this.$message.success('更改成功')
        } else {
          return this.$message.error('更改失败')
        }
      } else {
        startSingleInstance.parameter.instanceId = row.id
        const { data: res } = await myPost('/instanceAction/startSingleInstance', this.startSingleInstance)
        if (res.errorCode === '0000') {
          return this.$message.success('更改成功')
        } else {
          return this.$message.error('更改失败')
        }
      }
    }
  }
}

</script>

<style  scoped>
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
