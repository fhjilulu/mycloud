<template>
  <div>
    
      <div class="user-container">
      <div class="base-container">
      <div class="form-container">
        
    <br/><br/>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <h4>
              Total <br>
              152 resources <br>
              10 running
            </h4>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <h2 style="color: #67c23a">
              $ 25.00
            </h2>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <h2 style="color: #67c23a">
              $ 10.00
            </h2>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-row>
          <el-col :span="18">
           <el-button plain>Schedule</el-button>
           <el-button plain>Stop</el-button>
           <el-button plain>Start</el-button>
           <el-button plain>Team</el-button>
           <el-button plain>Group</el-button>
         </el-col>
        <el-col :span="6">
          <el-select  v-model="formData.Provider" placeholder="Filter" clearable :style="{width: '100%'}">
            <el-form  ref="filter" :model="formData" :rules="rules" size="mini" label-width="100px">
               <el-form-item label="Status" prop="Status">
                  <el-select v-model="formData.Status" placeholder="Select" clearable :style="{width: '90%'}">
                   <el-option v-for="(item, index) in StatusOptions" :key="index" :label="item.label"
                      :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
               </el-form-item>
            <el-form-item label="Schedule" prop="Schedule">
               <el-input v-model="formData.Schedule" clearable :style="{width: '90%'}"></el-input>
            </el-form-item>
            <el-form-item label="State" prop="State">
               <el-select v-model="formData.State" placeholder="Select" clearable :style="{width: '90%'}">
                  <el-option v-for="(item, index) in StateOptions" :key="index" :label="item.label"
                     :value="item.value" :disabled="item.disabled"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="Team" prop="Team">
                <el-input v-model="formData.Team" clearable :style="{width: '90%'}"></el-input>
            </el-form-item>
            <el-form-item label="Credential" prop="Credential">
                <el-input v-model="formData.Credential" clearable :style="{width: '90%'}"></el-input>
            </el-form-item>
            <el-form-item label="Provider" prop="Provider">
                <el-select v-model="formData.Provider" placeholder="Select" clearable :style="{width: '90%'}">
                  <el-option v-for="(item, index) in ProviderOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Location" prop="Location">
                <el-input v-model="formData.Location" clearable :style="{width: '90%'}"></el-input>
            </el-form-item>
            <el-form-item label="Name" prop="Name">
                <el-input v-model="formData.Name" clearable :style="{width: '90%'}"></el-input>
            </el-form-item>
            <el-form-item label="Tags" prop="Tags">
                <el-input v-model="formData.Tags" clearable :style="{width: '90%'}"></el-input>
            </el-form-item>
            <el-form-item label="Metrics" prop="Metrics">
                <el-select v-model="formData.Metrics" placeholder="Select" clearable :style="{width: '90%'}">
                  <el-option v-for="(item, index) in MetricsOptions" :key="index" :label="item.label"
                   :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
           <el-option>
           <el-form-item size="large">
             <el-button type="primary" @click="submitForm">Search</el-button>
             <el-button type="text" icon="el-icon-close" @click="resetForm">Close</el-button>
           </el-form-item>
           </el-option>
         </el-form>
     </el-select>
    </el-col>
   </el-row>

        <el-tab-pane label="All" name="All">
          <el-table
              ref="multipleTable"
              :data="tableData_all"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="State"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.state">
                  <el-tag type="success">ON</el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">OFF</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Team"
                width="120">
              <template slot-scope="scope">{{ scope.row.team }}</template>
            </el-table-column>
            <el-table-column
                label="Credentials"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.credential==0">
                  <el-tag type="warning">aws</el-tag>
                </div>
                <div v-else-if="scope.row.credential==1">
                  <el-tag>Azure</el-tag>
                </div>
                <div v-else-if="scope.row.credential==2">
                  <el-tag type="success">GGC</el-tag>
                </div>
                <div v-else-if="scope.row.credential==3">
                  <el-tag type="info">Ali</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Name"
                width="120">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                label="Cost"
                width="120">
              <template slot-scope="scope">${{ scope.row.cost }}</template>
            </el-table-column>
            <el-table-column
                label="Address"
                width="250">
              <template slot-scope="scope">{{ scope.row.address }}</template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-left: 10px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="7">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="AWS" name="AWS">
          <el-table
              ref="multipleTable"
              :data="tableData_aws"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="State"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.state">
                  <el-tag type="success">ON</el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">OFF</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Team"
                width="120">
              <template slot-scope="scope">{{ scope.row.team }}</template>
            </el-table-column>
            <el-table-column
                label="Credentials"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.credential==0">
                  <el-tag type="warning">aws</el-tag>
                </div>
                <div v-else-if="scope.row.credential==1">
                  <el-tag>Azure</el-tag>
                </div>
                <div v-else-if="scope.row.credential==2">
                  <el-tag type="success">GGC</el-tag>
                </div>
                <div v-else-if="scope.row.credential==3">
                  <el-tag type="info">Ali</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Name"
                width="120">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                label="Cost"
                width="120">
              <template slot-scope="scope">${{ scope.row.cost }}</template>
            </el-table-column>
            <el-table-column
                label="Address"
                width="250">
              <template slot-scope="scope">{{ scope.row.address }}</template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-left: 10px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="2">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Azure" name="Azure">
          <el-table
              ref="multipleTable"
              :data="tableData_Azure"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="State"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.state">
                  <el-tag type="success">ON</el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">OFF</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Team"
                width="120">
              <template slot-scope="scope">{{ scope.row.team }}</template>
            </el-table-column>
            <el-table-column
                label="Credentials"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.credential==0">
                  <el-tag type="warning">aws</el-tag>
                </div>
                <div v-else-if="scope.row.credential==1">
                  <el-tag>Azure</el-tag>
                </div>
                <div v-else-if="scope.row.credential==2">
                  <el-tag type="success">GGC</el-tag>
                </div>
                <div v-else-if="scope.row.credential==3">
                  <el-tag type="info">Ali</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Name"
                width="120">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                label="Cost"
                width="120">
              <template slot-scope="scope">${{ scope.row.cost }}</template>
            </el-table-column>
            <el-table-column
                label="Address"
                width="250">
              <template slot-scope="scope">{{ scope.row.address }}</template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-left: 10px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="2">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="GGC" name="GGC">
          <el-table
              ref="multipleTable"
              :data="tableData_GGC"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="State"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.state">
                  <el-tag type="success">ON</el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">OFF</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Team"
                width="120">
              <template slot-scope="scope">{{ scope.row.team }}</template>
            </el-table-column>
            <el-table-column
                label="Credentials"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.credential==0">
                  <el-tag type="warning">aws</el-tag>
                </div>
                <div v-else-if="scope.row.credential==1">
                  <el-tag>Azure</el-tag>
                </div>
                <div v-else-if="scope.row.credential==2">
                  <el-tag type="success">GGC</el-tag>
                </div>
                <div v-else-if="scope.row.credential==3">
                  <el-tag type="info">Ali</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Name"
                width="120">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                label="Cost"
                width="120">
              <template slot-scope="scope">${{ scope.row.cost }}</template>
            </el-table-column>
            <el-table-column
                label="Address"
                width="250">
              <template slot-scope="scope">{{ scope.row.address }}</template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-left: 10px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="2">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Ali" name="Ali">
          <el-table
              ref="multipleTable"
              :data="tableData_Ali"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="State"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.state">
                  <el-tag type="success">ON</el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">OFF</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Team"
                width="120">
              <template slot-scope="scope">{{ scope.row.team }}</template>
            </el-table-column>
            <el-table-column
                label="Credentials"
                width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.credential==0">
                  <el-tag type="warning">aws</el-tag>
                </div>
                <div v-else-if="scope.row.credential==1">
                  <el-tag>Azure</el-tag>
                </div>
                <div v-else-if="scope.row.credential==2">
                  <el-tag type="success">GGC</el-tag>
                </div>
                <div v-else-if="scope.row.credential==3">
                  <el-tag type="info">Ali</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="Name"
                width="120">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                label="Cost"
                width="120">
              <template slot-scope="scope">${{ scope.row.cost }}</template>
            </el-table-column>
            <el-table-column
                label="Address"
                width="250">
              <template slot-scope="scope">{{ scope.row.address }}</template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-left: 10px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="1">
            </el-pagination>
          </div>
        </el-tab-pane>

         
        
      </el-tabs>
    </div>
  </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'resources',
  data() {
    return {
      activeName: 'second',
      formData: {
        Status: undefined,
        Schedule: undefined,
        State: undefined,
        Team: undefined,
        Credential: undefined,
        Provider: undefined,
        Location: undefined,
        Name: undefined,
        Tags: undefined,
        Metrics: undefined,
      },
      rules: {
        Status: [],
        Schedule: [],
        State: [],
        Team: [],
        Credential: [],
        Provider: [],
        Location: [],
        Name: [],
        Tags: [],
        Metrics: [],
      },
      StatusOptions: [{
        "label": "Select",
        "value": 1
      }, {
        "label": "Attached",
        "value": 2
      }, {
        "label": "Detached",
        "value": ""
      }, {
        "label": "Overridden",
        "value": ""
      }],
      StateOptions: [{
        "label": "Select",
        "value": 1
      }, {
        "label": "Starting",
        "value": 2
      }, {
        "label": "Runing",
        "value": 3
      }, {
        "label": "Stopping",
        "value": 4
      }, {
        "label": "Stopped",
        "value": 5
      }, {
        "label": "Parking",
        "value": 6
      }, {
        "label": "Parked",
        "value": 7
      }, {
        "label": "Unavailable",
        "value": 8
      }],
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
      MetricsOptions: [{
        "label": "Select",
        "value": 1
      }, {
        "label": "Yes",
        "value": 2
      }, {
        "label": "No",
        "value": 3
      }],

      
      tableData_all: [{
        state: true,
        team: 'Prod Team',
        credential: 0,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 14.0
      }, {
        state: true,
        team: 'Prod Team',
        credential: 1,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 22.5
      }, {
        state: false,
        team: 'Prod Team',
        credential: 2,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 7.5
      }, {
        state: true,
        team: 'Prod Team',
        credential: 3,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 12.6
      }, {
        state: false,
        team: 'Prod Team',
        credential: 2,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 12.5
      }, {
        state: false,
        team: 'Prod Team',
        credential: 1,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 22.5
      }, {
        state: true,
        team: 'Prod Team',
        credential: 0,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 14.5
      }],
      tableData_aws: [{
        state: true,
        team: 'Prod Team',
        credential: 0,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 14.0
      },{
        state: true,
        team: 'Prod Team',
        credential: 0,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 14.5
      }],
      tableData_Azure: [{
        state: true,
        team: 'Prod Team',
        credential: 1,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 22.5
      },   {
        state: false,
        team: 'Prod Team',
        credential: 1,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 22.5
      }],
      tableData_GGC: [ {
        state: false,
        team: 'Prod Team',
        credential: 2,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 7.5
      },  {
        state: false,
        team: 'Prod Team',
        credential: 2,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 12.5
      }],
      tableData_Ali: [{
        state: true,
        team: 'Prod Team',
        credential: 3,
        address: '上海市普陀区金沙江路 1518 弄',
        name: 'qwer!@#$',
        cost: 12.6
      }],
      multipleSelection: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },






  
  created() {
    this.getData();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  padding-left: 30px;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
