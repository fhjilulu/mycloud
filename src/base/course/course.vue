<template>
  <div class="user-container">
    <div class="base-container">
      <div class="form-container">
        <div class="searchForm-container">
          <!--
          <el-form inline ref="searchForm" :model="searchForm" size="small">
            <el-form-item label="课程名">
              <el-input v-model="searchForm.name" placeholder="请输入课程名" class="input"></el-input>
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
              <el-form-item label="时间段">
              <el-select v-model="searchForm.time" placeholder="请选择时间段" class="input">
                <el-option label="00:00-01:00" value="00:00-01:00"></el-option>
                <el-option label="01:00-02:00" value="01:00-02:00"></el-option>
                <el-option label="02:00-03:00" value="02:00-03:00"></el-option>
                <el-option label="03:00-04:00" value="03:00-04:00"></el-option>
                <el-option label="04:00-05:00" value="04:00-05:00"></el-option>
                <el-option label="05:00-06:00" value="05:00-06:00"></el-option>
                <el-option label="06:00-07:00" value="06:00-07:00"></el-option>
                <el-option label="07:00-08:00" value="07:00-08:00"></el-option>
                <el-option label="08:00-09:00" value="08:00-09:00"></el-option>
                <el-option label="09:00-10:00" value="09:00-10:00"></el-option>
                <el-option label="10:00-11:00" value="10:00-11:00"></el-option>
                <el-option label="11:00-12:00" value="11:00-12:00"></el-option>
                <el-option label="12:00-13:00" value="12:00-13:00"></el-option>
                <el-option label="13:00-14:00" value="13:00-14:00"></el-option>
                <el-option label="14:00-15:00" value="14:00-15:00"></el-option>
                <el-option label="15:00-16:00" value="15:00-16:00"></el-option>
                <el-option label="16:00-17:00" value="16:00-17:00"></el-option>
                <el-option label="17:00-18:00" value="17:00-18:00"></el-option>
                <el-option label="18:00-19:00" value="18:00-19:00"></el-option>
                <el-option label="19:00-20:00" value="19:00-20:00"></el-option>
                <el-option label="20:00-21:00" value="20:00-21:00"></el-option>
                <el-option label="21:00-22:00" value="21:00-22:00"></el-option>
                <el-option label="22:00-23:00" value="22:00-23:00"></el-option>
                <el-option label="23:00-24:00" value="23:00-24:00"></el-option>
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
          <el-button class="button" size="small" type="myPrimary" @click="addClick()">添加课程</el-button>
        </div>
        -->

        <div class="table-container">
          <el-table :data="tableData" style="width: 100%" size="small" :header-cell-style="{backgroundColor:'#ECF6FF'}">
            <el-table-column fixed align="center" prop="name" label="课程名" min-width="40px"></el-table-column>
            <el-table-column align="center" prop="teaName" label="教师" min-width="30px"></el-table-column>
            <!-- <el-table-column align="center" prop="role" label="角色" min-width="100px">
              <template slot-scope="scope">
                <span v-if="scope.row.role==='STU'">学生</span>
                <span v-if="scope.row.role==='TEA'">教师</span>
              </template>
            </el-table-column> -->
            <el-table-column align="center" prop="number" label="开设人数" min-width="30px"></el-table-column>
            <el-table-column align="center" prop="laboratoryName" label="实验室" min-width="40px"></el-table-column>
            <el-table-column align="center" prop="week" label="星期" min-width="30px"></el-table-column>
            <el-table-column align="center" prop="fromTime" label="时间段" min-width="50px"></el-table-column>
            <el-table-column align="center" prop="isNeedDevice" label="是否需要设备" min-width="40px">
              <template slot-scope="scope">
                <span v-if="scope.row.isNeedDevice===true">是</span>
                <span v-if="scope.row.isNeedDevice===false">否</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" min-width="60px">
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
            <el-form-item label="课程名：" prop="name">
              <el-input v-model="form.name" placeholder="请输入课程名" class="diaInput"></el-input>
            </el-form-item>
            <el-form-item label="人数：" prop="number">
              <el-input v-model="form.number" placeholder="请输入人数" class="diaInput"></el-input>
            </el-form-item>
              <el-form-item label="实验室：" prop="laboratoryId">
              <el-select v-model="form.laboratoryId" placeholder="请选择实验室" class="diaInput">
                <el-option v-for="item in laboratoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="周几：" prop="week">
               <el-select v-model="form.week" placeholder="请选择周" class="input">
               <el-option label="周一" value="周一"></el-option>
                <el-option label="周二" value="周二"></el-option>
                <el-option label="周三" value="周三"></el-option>
                <el-option label="周四" value="周四"></el-option>
                <el-option label="周五" value="周五"></el-option>
                <el-option label="周六" value="周六"></el-option>
                <el-option label="周日" value="周日"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="时间段：" prop="time">
              <el-select v-model="form.time" placeholder="请选择时间段" multiple  allow-create class="input">
                <el-option label="00:00-01:00" value="00:00-01:00"></el-option>
                <el-option label="01:00-02:00" value="01:00-02:00"></el-option>
                <el-option label="02:00-03:00" value="02:00-03:00"></el-option>
                <el-option label="03:00-04:00" value="03:00-04:00"></el-option>
                <el-option label="04:00-05:00" value="04:00-05:00"></el-option>
                <el-option label="05:00-06:00" value="05:00-06:00"></el-option>
                <el-option label="06:00-07:00" value="06:00-07:00"></el-option>
                <el-option label="07:00-08:00" value="07:00-08:00"></el-option>
                <el-option label="08:00-09:00" value="08:00-09:00"></el-option>
                <el-option label="09:00-10:00" value="09:00-10:00"></el-option>
                <el-option label="10:00-11:00" value="10:00-11:00"></el-option>
                <el-option label="11:00-12:00" value="11:00-12:00"></el-option>
                <el-option label="12:00-13:00" value="12:00-13:00"></el-option>
                <el-option label="13:00-14:00" value="13:00-14:00"></el-option>
                <el-option label="14:00-15:00" value="14:00-15:00"></el-option>
                <el-option label="15:00-16:00" value="15:00-16:00"></el-option>
                <el-option label="16:00-17:00" value="16:00-17:00"></el-option>
                <el-option label="17:00-18:00" value="17:00-18:00"></el-option>
                <el-option label="18:00-19:00" value="18:00-19:00"></el-option>
                <el-option label="19:00-20:00" value="19:00-20:00"></el-option>
                <el-option label="20:00-21:00" value="20:00-21:00"></el-option>
                <el-option label="21:00-22:00" value="21:00-22:00"></el-option>
                <el-option label="22:00-23:00" value="22:00-23:00"></el-option>
                <el-option label="23:00-24:00" value="23:00-24:00"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="是否需要设备：">
              <el-select v-model="form.isNeedDevice" placeholder="请选择是否需要设备" class="input">
                <el-option label="是" :value='true'></el-option>
                <el-option label="否" :value='false'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开课老师：" prop="teaId" v-if="role==='ADMIN'">
              <el-select v-model="form.teaId" placeholder="请选择开课教师" class="diaInput">
                <el-option v-for="item in teacherList" :key="item.id" :label="item.nickname" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选课学生：" prop="stuIds">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="stu in stuList" :label="stu.id" :key="stu.id">{{stu.nickname}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="myPrimary" v-if="dialogTitle === '添加课程' " @click="submitAdd('form')">确定</el-button>
            <el-button size="small" type="myPrimary" v-if="dialogTitle === '编辑课程' " @click="submitEdit('form')">确定</el-button>
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
      header:{
        Token:sessionStorage.getItem("Token")
      },
      uploadUrl: base_url + "/api/upload/",
      dialogTitle: "",
      dialogVisible: false,
      max: 1,
      searchForm: {
        name: '',
        week: '',
        time: "",
        page: 0,
        size: 10
      },
      resetSearchForm: {
        name: '',
        week: '',
        time: "",
        page: 0,
        size: 10
      },
      form: {
        id: '',
        name: '',
        teaId: '',
        number: null,
        laboratoryId: '',
        isNeedDevice: '',
        week: '',
        time: [],
        stuIds: [],
      },
      laboratory: [],
      checkList: [],
      rules: {
        name: [{required: true, message: '课程名不能为空', trigger: 'blur'}],
        isNeedDevice: [{required: true, message: '是否需要设备不能为空', trigger: 'change'}],
        number: [{required: true, message: '人数不能为空', trigger: 'blur'}],
        laboratoryId: [{required: true, message: '所属实验室不能为空', trigger: 'change'}],
        week: [{required: true, message: '周几不能为空', trigger: 'change'}],
        time: [{required: true, message: '时间段不能为空', trigger: 'change'}]
      }
    };
  },
  created() {
    this.getData()
    this.getTeachers()
    this.getStus()
    this.getLaboratory()
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
      myPost('/course/search',this.searchForm)
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
