<template>
  <div class="user-container">
    <div class="base-container">
      <div class="form-container">
        <div class="searchForm-container">
          <el-form inline ref="searchForm" :model="searchForm" size="mini">
            <el-form-item label="预约实验室">
              <el-select v-model="searchForm.laboratoryId" placeholder="请选择预约实验室" class="diaInput">
                <el-option v-for="item in laboratoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="星期">
              <el-select v-model="searchForm.week" placeholder="请选择周" class="input">
                <el-option label="周一" value="周一"></el-option>
                <el-option label="周二" value="周二"></el-option>
                <el-option label="周三" value="周三"></el-option>
                <el-option label="周四" value="周四"></el-option>
                <el-option label="周五" value="周五"></el-option>
                <el-option label="周六" value="周六"></el-option>
                <el-option label="周日" value="周日"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <template>
                <el-time-select
                  placeholder="起始时间"
                  v-model="searchForm.startTime"
                  :picker-options="{
                    start: '00:00',
                    step: '01:00',
                    end: '24:00'
                  }">
                </el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="searchForm.endTime"
                  :picker-options="{
                    start: '00:00',
                    step: '01:00',
                    end: '24:00',
                    minTime: searchForm.startTime
                  }">
                </el-time-select>
              </template>
            </el-form-item>
            <el-form-item label="是否已满">
              <el-select v-model="searchForm.isReservation" placeholder="请选择是否预约" class="input">
                <el-option label="是" :value='true'></el-option>
                <el-option label="否" :value='false'></el-option>
              </el-select>
            </el-form-item>
             <!-- <el-form-item label="预约人昵称" v-if="role==='ADMIN'">
              <el-input v-model="searchForm.nickname" placeholder="请输入预约人昵称" class="input"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button type="myPrimary" @click="getSearch()">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="myCancel" @click="resetSearch()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="add-button-container">
          <el-button class="button" size="small" type="myPrimary" @click="addClick()">添加课程</el-button>
        </div> -->
        <div class="table-container">
          <el-table :data="tableData" style="width: 100%" size="small" :header-cell-style="{backgroundColor:'#ECF6FF'}">
            <el-table-column align="center" prop="laboratory" label="预约实验室" min-width="40px"></el-table-column>
            <el-table-column align="center" prop="week" label="星期" min-width="40px"></el-table-column>
            <el-table-column align="center" prop="time" label="时间段" min-width="40px"></el-table-column>
            <el-table-column align="center" prop="isHavePerson" label="是否有人预约" min-width="60px">
              <template slot-scope="scope">
                <span v-if="scope.row.isHavePerson">是</span>
                <span v-if="!scope.row.isHavePerson">否</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="isReservation" label="是否预约已满" min-width="60px">
              <template slot-scope="scope">
                <span v-if="scope.row.isReservation">是</span>
                <span v-if="!scope.row.isReservation">否</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" prop="nickname" label="预约人昵称" min-width="60px" v-if="role==='ADMIN'"></el-table-column>
             <el-table-column align="center" prop="role" label="预约人角色" min-width="40px" v-if="role==='ADMIN'">
              <template slot-scope="scope">
                <span v-if="scope.row.role==='STU'">学生</span>
                <span v-if="scope.row.role==='TEA'">教师</span>
              </template>
             </el-table-column> -->
            <el-table-column align="center" label="操作" fixed="right" min-width="60px">
              <template slot-scope="scope">
                <el-button type="text" size="mini" class="color-green" @click="reservation(scope.row)" v-if="role!='ADMIN'">预约</el-button>
                <el-button type="text" size="mini" class="color-green" @click="cancel(scope.row)" v-if="role!='ADMIN'">取消预约</el-button>
                <el-button type="text" size="mini" class="color-green" @click="sendDetail(scope.row)" v-if="role==='ADMIN'">查看预约记录</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <pagination @pagination="getData()" :pageIndex.sync="page" :size.sync="searchForm.size" :total="total"></pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
import {myGet,myPost,base_url} from '@/api/http'
export default {
  data() {
    return {
      role: '',
      page: 1,
      total: 0,
      tableData: [],
      laboratoryList: [],
      searchIsReservation: 'true',
      header:{
        Token:sessionStorage.getItem("Token")
      },
      uploadUrl: base_url + "/api/upload/",
      dialogTitle: "",
      dialogVisible: false,
      max: 1,
      searchForm: {
        nickname: '',
        week: '周一',
        startTime: null,
        endTime: null,
        laboratoryId: '',
        isReservation: ''
      },
      resetSearchForm: {
        nickname: '',
        // week: '',
        startTime: '',
        endTime: '',
        isReservation: null
      },
      form: {
        id: '',
        nickname: '',
        laboratory: '',
        laboratryId: '',
        week: '',
        time: '',
        isReservation: null,
        role: '',
      },
    };
  },
  created() {
    this.getData()
    this.getLaboratory();
    this.role = sessionStorage.getItem('role'); 
  },
  methods: {
    resetSearch() {
      this.searchForm = {...this.resetSearchForm}
      this.searchIsReservation = '';
      this.searchForm.week = '周一';
      this.getData()
    },
    getSearch() {
      this.page = 1
      this.getData()
    },
    getData() {
      this.searchForm.page = this.page - 1;
      myPost('/laboratory/search',this.searchForm)
      .then(res => {
        this.tableData = [...res.data.data]
        this.total = res.data.data.totalElements
      })
    },
    getTeachers() {
      myPost('/user/tea/list')
      .then(res => {
        this.teacherList = [...res.data.data]
      })
    },
     sendDetail(row) {
      this.$router.push({path:"reservationDetail/"+row.id});
    },
    getLaboratory() {
      myPost('/laboratory/findAll')
      .then(res => {
        this.laboratoryList = [...res.data.data]
      })
    },
    getStus() {
      myPost('/user/stu/list')
      .then(res => {
        this.stuList = [...res.data.data]
      })
    },
    addClick() {
      this.form = { ...this.resetForm }
      this.dialogTitle = "添加课程";
      this.dialogVisible = true;
      this.checkList = [];
    },
    editClick(row) {
      this.form = {...row}
      this.dialogTitle = "编辑课程";
      this.dialogVisible = true;
      this.checkList = [];
      myPost('/user/stu/find/'+row.id)
      .then(res => {
        this.stuList = [...res.data.data]
        for(let i in this.stuList){
          if(this.stuList[i].isSelected){
             this.checkList.push(this.stuList[i].id)
          }
        }
      })
    },
    reservation(row) {
      let reservation = {...row}
      myPost('/laboratory/reservation', reservation)
      .then(res => {
          this.$message({
            type: "success",
            message: "预约成功"
          });
          this.getData();
      })
    },
    cancel(row) {
      let reservation = {...row}
      myPost('/laboratory/cancel/'+ reservation.id)
      .then(res => {
          this.$message({
            type: "success",
            message: "取消成功"
          });
          this.getData();
      })
    },
    deleteClick(row){
      this.$confirm("确定要删除该课程么?", "提示", {
        confirmButtonClass: "el-button--myPrimary",
        type: "warning"
      })
      .then(() => {
         myPost("/course/delete/" + row.id).then(res =>{
          this.$message.success("删除成功")
          this.getData()
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    submitAdd(formName) {
      this.form.stuIds = this.checkList;
      this.$refs[formName].validate((valid) => {
        if(valid) {
          myPost("/course/add", this.form)
          .then(res => {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.getData();
            this.dialogVisible = false;
          });
        }
      }) 
    },
    submitEdit(formName) {
      this.form.stuIds = this.checkList;
      this.$refs[formName].validate((valid) => {
        if(valid) {
          myPost("/course/edit", this.form)
          .then(res => {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.getData();
            this.dialogVisible = false;
          });
        }
      })
    }
  },
  components: {pagination}
};
</script>

<style scoped>
  .input {
    width: 160px;
  }
  .diaInput {
    width: 90%;
  }
</style>
