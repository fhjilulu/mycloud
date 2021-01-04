<template>
  <div class="user-container">
    <div class="base-container">
      <div class="form-container">
        <div class="searchForm-container">
          <el-form inline ref="searchForm" :model="searchForm" size="small">
            <el-form-item label="学号">
              <el-input v-model="searchForm.account" placeholder="请输入学号" class="input"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="searchForm.nickname" placeholder="请输入昵称" class="input"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="myPrimary" @click="getSearch()">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="myCancel" @click="resetSearch()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="add-button-container">
          <router-link to='/reservation'><el-button type="text" size="mini" class="color-blue">返回预约管理</el-button></router-link>        </div>
        <div class="table-container">
          <el-table :data="tableData" style="width: 100%" size="small" :header-cell-style="{backgroundColor:'#ECF6FF'}">
            <el-table-column align="center" prop="role" label="预约人角色" min-width="40px">
              <template slot-scope="scope">
                <span v-if="scope.row.role==='STU'">学生</span>
                <span v-if="scope.row.role==='TEA'">教师</span>
              </template>
            </el-table-column>
            <el-table-column fixed align="center" prop="account" label="预约账号" min-width="40px"></el-table-column>
            <el-table-column fixed align="center" prop="nickname" label="预约人昵称" min-width="40px"></el-table-column>
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
      teacherList: [],
      laboratoryList: [],
      stuList: [],
      courseList: [],
      header:{
        Token:sessionStorage.getItem("Token")
      },
      uploadUrl: base_url + "/api/upload/",
      dialogTitle: "",
      dialogVisible: false,
      max: 1,
      searchForm: {
        nickname: '',
        account: '',
        id: '',
      },
      resetSearchForm: {
        nickname: '',
        account: '',
      },
      form: {
        id: '',
        nickname: '',
        account: ''
      },
      laboratory: [],
      checkList: [],
      rules: {
        nickname: [{required: true, message: '昵称不能为空', trigger: 'blur'}],
        courseId: [{required: true, message: '所属课程不能为空', trigger: 'change'}]
      }
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.searchForm.id = this.$route.params.id;
    this.getData()
    this.getTeachers()
    this.getCourses()
    this.role = sessionStorage.getItem('role'); 
  },
  methods: {
    resetSearch() {
      this.searchForm.name = this.resetSearchForm.name;
      this.searchForm.account = this.resetSearchForm.account;
      this.getData()
    },
    getSearch() {
      this.page = 1
      this.getData()
    },
    getData() {
      this.searchForm.page = this.page - 1
      myPost('/laboratory/reservationDetail',this.searchForm)
      .then(res => {
        this.tableData = [...res.data.data]
        console.log(this.tableData);
      })
    },
    getTeachers() {
      myPost('/user/tea/list')
      .then(res => {
        this.teacherList = [...res.data.data]
      })
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
    getCourses() {
      myPost('/course/list')
      .then(res => {
        this.courseList = [...res.data.data]
      })
    },
    addClick() {
      this.form = { ...this.resetForm }
      this.dialogTitle = "添加设备";
      this.dialogVisible = true;
      this.checkList = [];
    },
    editClick(row) {
      this.form = {...row}
      this.dialogTitle = "编辑设备";
      this.dialogVisible = true;
      this.checkList = [];
    },
    deleteClick(row){
      this.$confirm("确定要删除该设备么?", "提示", {
        confirmButtonClass: "el-button--myPrimary",
        type: "warning"
      })
      .then(() => {
         myPost("/device/delete/" + row.id).then(res =>{
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
          myPost("/device/add", this.form)
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
          myPost("/device/edit", this.form)
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
