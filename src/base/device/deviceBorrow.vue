<template>
  <div class="user-container">
    <div class="base-container">
      <div class="form-container">
          <el-form label-width="110px" size="small">
            <el-form-item label="所属课程：">
              <el-select v-model="courseId" placeholder="请选择课程" class="diaInput">
                <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id" style="width:200px"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备号：">
               <el-input v-model="id" placeholder="请输入设备号" class="diaInput" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="操作：">
              <el-button size="small" type="myPrimary" @click="borrow()">借用</el-button> 
            </el-form-item>
          </el-form>
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
      radio: 2,
      page: 1,
      total: 0,
      tableData: [],
      teacherList: [],
      laboratoryList: [],
      stuList: [],
      courseList: [],
      isBorrow: true,
      header:{
        Token:sessionStorage.getItem("Token")
      },
      uploadUrl: base_url + "/api/upload/",
      dialogTitle: "",
      dialogVisible: true,
      max: 1,
      id: '',
      courseId: '',
      searchForm: {
        name: '',
        courseId: '',
        status: null,
        page: 0,
        size: 10
      },
      resetSearchForm: {
        name: '',
        courseId: '',
        status: null,
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
        status: null,
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
    this.getData()
    this.getTeachers()
    this.getCourses()
    this.role = sessionStorage.getItem('role'); 
  },
  methods: {
    resetSearch() {
      this.searchForm = {...this.resetSearchForm}
      this.getData()
    },
    getSearch() {
      this.page = 1
      this.getData()
    },
    getData() {
      this.searchForm.page = this.page - 1
      myPost('/device/search',this.searchForm)
      .then(res => {
        this.tableData = [...res.data.data.content]
        this.total = res.data.data.totalElements
      })
    },
    borrow(){
      if(this.id == ''){
        this.$message.error("设备号不能为空")
      }else if(this.courseId == ''){
        this.$message.error("课程不能为空")
      }else{
        myPost('/device/borrow/'+this.id+"/"+this.courseId) 
        .then(res => {
          this.$message({
            type: "success",
            message: "借用成功"
          });
         }) 
      }
      
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
    sendBorrow(row) {
      this.$router.push({path:"borrow/"+row.id});
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
