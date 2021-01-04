<template>
  <div>
      <div class="user-container">
      <div class="base-container">
      <div class="form-container">
        <el-row>
            <el-col :span="4">
                <h1 class="pmc-scheduling-main-slide__header-title">Scheduling</h1>
            </el-col>
            <el-col :span="4" :offset="10">
                <el-button type="primary" size="medium">Copy Schedule</el-button>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" size="medium">Add Schedule</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8" :offset="16">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                  <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 卡片视图 -->
        <el-card>
        </el-card> 

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
    
    step1(){
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
