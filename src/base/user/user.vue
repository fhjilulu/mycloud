<template>
  <div class="user-container">
    <div class="base-container">
      <div class="form-container">
        <div class="searchForm-container">
          <el-form inline ref="searchForm" :model="searchForm" size="small">
            <el-form-item label="学号/工号">
              <el-input v-model="searchForm.account" placeholder="请输入学号/工号" class="input"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名：">
              <el-input v-model="searchForm.nickname" placeholder="请输入用户姓名" class="input"></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="searchForm.role" placeholder="请选择角色" class="input">
                <el-option label="学生" value="STU"></el-option>
                <el-option label="教师" value="TEA"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="所属课程：" prop="courseId">
              <el-select v-model="searchForm.courseId" placeholder="请选择课程" class="diaInput">
                <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="是否拉黑">
              <el-select v-model="searchForm.available" placeholder="请选择是否可登录" class="input">
                <el-option label="是" value="false"></el-option>
                <el-option label="否" value="true"></el-option>
              </el-select>
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
          <el-button class="button" size="small" type="myPrimary" @click="delAll()">批量删除</el-button>
          <el-button class="button" size="small" type="myPrimary" @click="addClick()">添加用户</el-button>
        </div>
        <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-tree :data="data" :props="defaultProps" :default-expand-all='true'></el-tree>
        </el-aside>
  
        <el-container>
        <el-main>
        <div class="table-container">
          <el-table :data="tableData" style="width: 100%" size="small" ref="multipleTable" @selection-change="handleSelectionChange" :header-cell-style="{backgroundColor:'#ECF6FF'}">
            <el-table-column type="selection" ></el-table-column>
            <el-table-column fixed align="center" prop="account" label="学号/工号" min-width="90px"></el-table-column>
            <el-table-column align="center" prop="nickname" label="姓名" min-width="80px"></el-table-column>
            <el-table-column align="center" prop="role" label="角色" min-width="100px">
              <template slot-scope="scope">
                <span v-if="scope.row.role==='STU'">学生</span>
                <span v-if="scope.row.role==='TEA'">教师</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="phone" label="手机号码" min-width="120px"></el-table-column>
            <el-table-column align="center" prop="courseName" label="课程" min-width="120px"></el-table-column>
            <el-table-column align="center" label="操作" fixed="right" min-width="100px">
              <template slot-scope="scope">
                <el-button type="text" size="mini" class="color-green" @click="editClick(scope.row)">编辑</el-button>
                <el-button type="text" size="mini" class="color-red" @click="deleteClick(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
         <pagination @pagination="getData()" :pageIndex.sync="page" :size.sync="searchForm.size" :total="total"></pagination>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" top="10vh" :close-on-click-modal="false" width="500px">
          <el-form :model="form" ref="form" :rules="rules" label-width="110px" size="small">
            <el-form-item label="学号/工号：" prop="account">
              <el-input v-model="form.account" placeholder="请输入学号/工号" class="diaInput"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="nickname">
              <el-input v-model="form.nickname" placeholder="请输入姓名" class="diaInput"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号码" class="diaInput"></el-input>
            </el-form-item>
            <el-form-item label="角色：" prop="role">
              <el-select v-model="form.role" placeholder="请选择角色" class="diaInput">
                <el-option label="学生" value="STU"></el-option>
                <el-option label="教师" value="TEA"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否可登录：" prop="available">
              <el-switch
                v-model="form.available"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
              <!-- <el-form-item label="指导老师：" prop="teaId" v-if="form.role==='STU'">
              <el-select v-model="form.teaId" placeholder="请选择指导老师" class="diaInput">
                <el-option v-for="item in teacherList" :key="item.id" :label="item.nickname" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="myPrimary" v-if="dialogTitle === '添加用户' " @click="submitAdd('form')">确定</el-button>
            <el-button size="small" type="myPrimary" v-if="dialogTitle === '编辑用户' " @click="submitEdit('form')">确定</el-button>
            <el-button size="small" type="myCancel" @click="dialogVisible = false">取消</el-button>
          </div>
        </el-dialog>
      </el-main>
     </el-container>
    </el-container>
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
      data: [],
      checkIds: [],
      defaultProps: {
        children: 'course',
        label: 'name'
      },
      page: 1,
      total: 0,
      tableData: [],
      teacherList: [],
      courseList: [],
      header:{
        Token:sessionStorage.getItem("Token")
      },
      uploadUrl: base_url + "/api/upload/",
      dialogTitle: "",
      dialogVisible: false,
      multipleSelection: [],//多选的数据
      delarr: [], //删除的数据
      max: 1,
      searchForm: {
        account: '',
        nickname: '',
        courseId: '',
        role: null,
        available: null,
        page: 0,
        size: 10,
      },
      resetSearchForm: {
        account: '',
        nickname: '',
        courseId: '',
        role: null,
        available: null,
        page: 0,
        size: 10,
      },
      form: {
        account: '',
        nickname: '',
        phone: '',
        courseName: '',
        role: null,
        available: true
      },
      deleteIds: {
        ids: []
      },
      rules: {
        account: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        nickname: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
        role: [{required: true, message: '角色不能为空', trigger: 'change'}],
        phone: [{required: true, message: '手机号码不能为空', trigger: 'change'}],
      }
    };
  },
  created() {
    this.getData()
    this.getTeachers()
    this.getCourses()
    this.getLatoryAndCourse();
  },
  methods: {
    resetSearch() {
      console.log(this.checkIds);
      this.searchForm = {...this.resetSearchForm}
      this.getData()
    },
    getSearch() {
      this.page = 1
      this.getData()
    },
    getData() {
      this.searchForm.page = this.page - 1
      myPost('/user/search',this.searchForm)
      .then(res => {
        this.tableData = [...res.data.data.content]
        this.total = res.data.data.totalElements
      })
    },
     getCourses() {
      myPost('/course/list')
      .then(res => {
        this.courseList = [...res.data.data]
      })
    },
    getLatoryAndCourse(){
      myPost('/course/laboratory/list',this.searchForm)
      .then(res => {
        this.data = [...res.data.data]
      })
    },
    getTeachers() {
      myPost('/user/tea/list')
      .then(res => {
        this.teacherList = [...res.data.data]
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAll() {
      const length = this.multipleSelection.length;
      if(length == 0){
        this.$message.error("至少选择一个")
      }else{ 
        this.delarr = [];
        for (let i = 0; i < length; i++) {
          this.delarr.push(this.multipleSelection[i].id)
        }
        this.deleteIds.ids = this.delarr;
        this.$confirm("确定要删除该用户么?", "提示", {
        confirmButtonClass: "el-button--myPrimary",
        type: "warning"
        })
        .then(() => {
          myPost("/user/delete/list", this.deleteIds).then(res =>{
            this.$message.success("批量删除成功")
            this.getData()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消批量删除"
          });
        });
      }
    },
    addClick() {
      this.form = { ...this.resetForm }
      this.dialogTitle = "添加用户";
      this.form.available = true;
      this.dialogVisible = true;
    },
    editClick(row) {
      this.form = {...row}
      this.dialogTitle = "编辑用户";
      this.dialogVisible = true;
    },
    deleteClick(row){
      this.$confirm("确定要删除该用户么?", "提示", {
        confirmButtonClass: "el-button--myPrimary",
        type: "warning"
      })
      .then(() => {
         myPost("/user/delete/" + row.id).then(res =>{
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
      this.$refs[formName].validate((valid) => {
        if(valid) {
          myPost("/user/add", this.form)
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
      this.$refs[formName].validate((valid) => {
        if(valid) {
          myPost("/user/edit", this.form)
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
