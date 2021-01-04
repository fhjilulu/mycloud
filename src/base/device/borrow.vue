<template>
  <div class="user-container">
    <div class="base-container">
      <div class="form-container">
        <div class="searchForm-container">
          <el-form inline ref="searchForm" :model="searchForm" size="small">
            <el-form-item label="设备名">
              <el-input v-model="searchForm.name" placeholder="请输入设备名" class="input"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="searchForm.account" placeholder="请输入学号" class="input"></el-input>
            </el-form-item>
            <!-- <el-form-item label="所属课程：" prop="courseId">
              <el-select v-model="searchForm.courseId" placeholder="请选择所属课程" class="diaInput">
                <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-button type="myPrimary" @click="getSearch()">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="myCancel" @click="resetSearch()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="add-button-container">
          <router-link to='/device'><el-button type="text" size="mini" class="color-blue">返回设备管理</el-button></router-link>        </div>
        <div class="table-container">
          <el-table :data="tableData" style="width: 100%" size="small" :header-cell-style="{backgroundColor:'#ECF6FF'}">
            <el-table-column fixed align="center" prop="name" label="设备名" min-width="40px"></el-table-column>
            <el-table-column fixed align="center" prop="type" label="设备号" min-width="40px"></el-table-column>
            <!-- <el-table-column fixed align="center" prop="isBorrow" label="是否被借用" min-width="40px">
              <template slot-scope="scope">
                <span v-if="scope.row.isBorrow">是</span>
                <span v-if="!scope.row.isBorrow">否</span>
              </template>
            </el-table-column> -->
            <el-table-column fixed align="center" prop="desc" label="说明" min-width="60px"></el-table-column>
            <el-table-column align="center" prop="courseId" label="课程号" min-width="45px"></el-table-column>
            <el-table-column align="center" prop="courseName" label="课程名" min-width="35px"></el-table-column>
            <el-table-column align="center" prop="account" label="学号" min-width="35px"></el-table-column>
            <el-table-column align="center" prop="nickname" label="学生姓名" min-width="35px"></el-table-column>
            <el-table-column align="center" prop="borrowTime" label="借用时间" min-width="40px"></el-table-column>
            <el-table-column align="center" prop="alsoTime" label="归还时间" min-width="40px"></el-table-column>
            <!-- <el-table-column align="center" label="操作" fixed="right" min-width="60px">
              <template slot-scope="scope">
                <el-button type="text" size="mini" class="color-green" @click="editClick(scope.row)">编辑</el-button>
                <el-button type="text" size="mini" class="color-red" @click="deleteClick(scope.row)">删除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
          <pagination @pagination="getData()" :pageIndex.sync="page" :size.sync="searchForm.size" :total="total"></pagination>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" top="10vh" :close-on-click-modal="false" width="500px">
          <el-form :model="form" ref="form" :rules="rules" label-width="110px" size="small">
            <el-form-item label="设备名：" prop="name">
              <el-input v-model="form.name" placeholder="请输入设备名" class="diaInput"></el-input>
            </el-form-item>
            <el-form-item label="所属课程：" prop="courseId">
              <el-select v-model="form.courseId" placeholder="请选择课程" class="diaInput">
                <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备号：" prop="type">
               <el-input v-model="form.type" placeholder="请输入设备号" class="diaInput"></el-input>
            </el-form-item>
              <el-form-item label="说明：" prop="desc">
              <el-input type="textarea" :rows="2" v-model="form.desc" placeholder="请输入说明" class="diaInput"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="myPrimary" v-if="dialogTitle === '添加设备' " @click="submitAdd('form')">确定</el-button>
            <el-button size="small" type="myPrimary" v-if="dialogTitle === '编辑设备' " @click="submitEdit('form')">确定</el-button>
            <el-button size="small" type="myCancel" @click="dialogVisible = false">取消</el-button>
          </div>
        </el-dialog>
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
        name: '',
        account: '',
        deviceId: '',
        courseId: '',
        isBorrow: null,
        page: 0,
        size: 10
      },
      resetSearchForm: {
        name: '',
        account: '',
        page: 0,
        size: 10
      },
      form: {
        id: '',
        name: '',
        type: '',
        desc: '',
        courseId: '',
        courseName: '',
        isBorrow: null,
        account: '',
        nickname: '',
        borrowTime: '',
        alsoTime: '',
      },
      laboratory: [],
      checkList: [],
      rules: {
        name: [{required: true, message: '设备名不能为空', trigger: 'blur'}],
        courseId: [{required: true, message: '所属课程不能为空', trigger: 'change'}]
      }
    };
  },
  created() {
    this.searchForm.deviceId = this.$route.params.id;
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
      myPost('/device/borrow/search',this.searchForm)
      .then(res => {
        this.tableData = [...res.data.data.content]
        this.total = res.data.data.totalElements
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
