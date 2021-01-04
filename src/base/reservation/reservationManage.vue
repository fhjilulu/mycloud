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
             <el-form-item label="学生/教师">
              <el-select v-model="searchForm.isStu" placeholder="请选择学生/教师" class="input">
                <el-option label="学生" :value='true'></el-option>
                <el-option label="教师" :value='false'></el-option>
              </el-select>
            </el-form-item>
             <!-- <el-form-item label="预约人昵称" v-if="role==='ADMIN'">
              <el-input v-model="searchForm.nickname" placeholder="请输入预约人昵称" class="input"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button type="myPrimary" @click="getSearch()">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="add-button-container">
          <el-button class="button" size="small" type="myPrimary" @click="addClick()">添加课程</el-button>
        </div> -->
        <div class="table-container">
          <!-- <el-table style="width: 100%" size="small" :header-cell-style="{backgroundColor:'#ECF6FF'}"> -->
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="reservation in reservationList" :label="reservation.id" :key="reservation.id">{{reservation.time}}</el-checkbox>
            </el-checkbox-group>
            <br />
            <el-button type="primary" size="mini" @click="reservation()">提交</el-button>
          <!-- </el-table> -->
            <!-- <el-table-column fixed align="center" prop="time" label="预约时间段" min-width="40px"></el-table-column> -->
            <!-- <el-table-column align="center" prop="isTea" label="教师是否可预约" min-width="60px">
              <template slot-scope="scope">
                <span v-if="scope.row.isTea">是</span>
                <span v-if="!scope.row.isTea">否</span>
              </template>
            </el-table-column>
             <el-table-column align="center" prop="isStu" label="学生是否可预约" min-width="60px">
              <template slot-scope="scope">
                <span v-if="scope.row.isStu">是</span>
                <span v-if="!scope.row.isStu">否</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" min-width="60px">
              <template slot-scope="scope">
                <el-button type="text" size="mini" class="color-green" @click="reservation(scope.row)" v-if="role!='ADMIN'">预约</el-button>
                <el-button type="text" size="mini" class="color-green" @click="cancel(scope.row)" v-if="role!='ADMIN'">取消预约</el-button>
                <el-button type="text" size="mini" class="color-green" @click="sendDetail(scope.row)" v-if="role==='ADMIN'">查看预约记录</el-button>
              </template>
            </el-table-column> -->
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
      total: 0,
      tableData: [],
      checkList: [],
      laboratoryList: [],
      reservationList: [],
      searchIsReservation: 'true',
      header:{
        Token:sessionStorage.getItem("Token")
      },
      uploadUrl: base_url + "/api/upload/",
      dialogTitle: "",
      dialogVisible: false,
      max: 1,
      searchForm: {
        week: '周一',
        laboratoryId: '',
        isStu: true
      },
      resetSearchForm: {
        nickname: '',
        // week: '',
        startTime: '',
        endTime: '',
      },
      form: {
        id: '',
        isStu: true
      },
      updateForm: {
        ids: [],
        allIds: [],
        isStu: true
      }
    };
  },
  created() {
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
      this.getData()
    },
    getData() {
      this.checkList = [];
      this.reservationList = [];
      this.updateForm.allIds = [];
      myPost('/laboratory/manage/search',this.searchForm)
      .then(res => {
        this.reservationList = [...res.data.data];
        for(let i in this.reservationList){
          if(this.searchForm.isStu && this.reservationList[i].isStu){
             this.checkList.push(this.reservationList[i].id)
          }
          if(!this.searchForm.isStu && this.reservationList[i].isTea){
             this.checkList.push(this.reservationList[i].id)
          }
        }
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
        let laboratory = this.laboratoryList[0];
        this.searchForm.laboratoryId = laboratory.id;
        this.getData();
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
    reservation() {
      this.updateForm.ids = this.checkList
      this.updateForm.isStu = this.searchForm.isStu
      for(let i in this.reservationList){
        this.updateForm.allIds.push(this.reservationList[i].id)
      }
      myPost('/laboratory/manage/edit', this.updateForm)
      .then(res => {
          this.$message({
            type: "success",
            message: "更新成功"
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
