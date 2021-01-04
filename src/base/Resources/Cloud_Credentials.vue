<template>
  <div>
    <router-view></router-view>
      <div class="user-container">
      <div class="base-container">
      <div class="form-container">
     <br/><br/>
    <el-row :gutter="20">
      <el-col :span="14">
          <div class="user-info-list">
            <h2 style="color: darkblue">Cloud Credentials</h2>
          </div>
      </el-col>
      <el-col :span="4" >
          <el-button type="primary" size="medium" @click="gotolink">Add Cloud Credentials</el-button>
      </el-col>
      <el-col :span="6">
          <el-select  v-model="formData.Provider" placeholder="Filter" clearable :style="{width: '100%'}">
            <el-form  ref="filter" :model="formData" :rules="rules" size="mini" label-width="100px">
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

      formData: {
        Team: undefined,
        Provider: undefined,
        Name: undefined,
      },
      rules: {
        Team: [],
        Provider: [],
        Name: [],
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
      this.role = JSON.parse(sessionStorage.getItem('accountInfo')).role
    },
    methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    
    gotolink(){
      this.$router.push("/Cloud_Credentials/add/step1");
      //this.$router.push({ path: "/Cloud_Credentials/add/step1" ,name:"step1"});
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
