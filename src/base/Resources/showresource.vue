<template>
   <div class="user-container">
     <div class="base-container">
       <div class="form-container">
                  <br/><h1>资源详细信息</h1><br/><br/>
              <div>
                  <el-card>
              <el-row :gutter="20">
              <el-col :span="2" class="el-title"> <br/> </el-col>
              <el-col :span="4" class="el-title">Team </el-col>
              <el-col :span="5" class="el-title">Credential </el-col>
              <el-col :span="5" class="el-title">Location </el-col>
              <el-col :span="4" class="el-title">Cost </el-col>
              <el-col :span="4" class="el-title">State </el-col>
              <br/><br/>
              <el-col :span="2" class="el-title"> <br/> </el-col>
              <el-col :span="4" > {{team}} </el-col>
              <el-col :span="5" > {{credential}} </el-col>
              <el-col :span="5" > {{region}} </el-col>
              <el-col :span="4" > {{channelCost}} </el-col>
              <el-col :span="4" > 
                    <el-switch
                          @change='statuschange($event, startSingleInstance, stopSingleInstance)'
                         v-model="this.status"
                         active-value="R"
                         inactive-value="S">
                     </el-switch></el-col>
              <br/><br/></el-row>
                </el-card>
              </div>

                  <br/><br/><br/>

              <div>
              <el-row :gutter="20">
              <el-col :span="1" class="el-title"> <br/> </el-col>
              <el-col :span="5" class="el-list"> channelInstanceId </el-col>
              <el-col :span="5" > {{channelInstanceId}} </el-col>
              <el-col :span="2" > <br/> </el-col>
              <el-col :span="5" class="el-list"> channelInstanceName </el-col>
              <el-col :span="5" >{{channelInstanceName}} </el-col></el-row>
              </div>
              <br/><br/>

              <div>
              <el-row :gutter="20">
              <el-col :span="1" class="el-title"> <br/> </el-col>
              <el-col :span="5" class="el-list"> vcpu</el-col>
              <el-col :span="5"> {{vcpu}} </el-col>
              <el-col :span="2" > <br/> </el-col>
              <el-col :span="5" class="el-list"> memory </el-col>
              <el-col :span="6"> {{memory}} </el-col></el-row>
              </div>
              <div>
              <el-row :gutter="20">
              <br/><br/>
              <el-col :span="1" class="el-title"> <br/> </el-col>
              <el-col :span="5" class="el-list"> publicIpAddress</el-col>
              <el-col :span="5"> {{publicIpAddress}} </el-col>
              <el-col :span="2" > <br/> </el-col>
              <el-col :span="5" class="el-list"> privateIpAddress</el-col>
              <el-col :span="6"> {{privateIpAddress}} </el-col></el-row>
              </div>
       </div>
       </div>
       </div>
</template>

<script>
export default {
   data () {
     return {
       id:"",
       region:"", 
       status:"", 
       team:"", 
       credential:"", 
       channelInstanceId:"", 
       channelInstanceName:"", 
       vcpu:"", 
       memory:"", 
       publicIpAddress:"", 
       privateIpAddress:"", 
       channelCost:"", 
    }
  },
 created(){
    this.getParams()
  },
   methods :{getParams(){
    // 取到路由带过来的参数
    const showid=this.$route.query.id
    const showregion=this.$route.query.region
    const showstatus= this.$route.query.status
    const showteam =this.$route.query.team
    const showcredential=this.$route.query.credential
    const showchannelInstanceId=this.$route.query.channelInstanceId
    const showchannelInstanceName=this.$route.query.channelInstanceName
    const showvcpu=this.$route.query.vcpu
    const showmemory=this.$route.query.memory
    const showpublicIpAddress=this.$route.query.publicIpAddress
    const showprivateIpAddress=this.$route.query.privateIpAddress
    const showchannelCost=this.$route.query.channelCost 
    //将数据放在当前组件的数据内
    this.id=showid
    this.region=showregion
    this.status=showstatus
    this.team=showteam
    this.credential=showcredential
    this.channelInstanceId=showchannelInstanceId
    this.channelInstanceName=showchannelInstanceName
    this.vcpu=showvcpu
    this.memory=showmemory
    this.publicIpAddress=showpublicIpAddress
    this.privateIpAddress=showprivateIpAddress
    this.channelCost=showchannelCost
    //this.keyupMallName()
   }
  },
  watch: {
   '$route': 'getParams'
  },
   async statuschange (callback, startSingleInstance, stopSingleInstance) {
      if (callback === 'S') {
        stopSingleInstance.parameter.instanceId = this.id
        const { data: res } = await myPost('/instanceAction/stopSingleInstance', this.stopSingleInstance)
        if (res.errorCode === '0000') {
          return this.$message.success('更改成功')
        } else {
          return this.$message.error('更改失败')
        }
      } else {
        startSingleInstance.parameter.instanceId = this.id
        const { data: res } = await myPost('/instanceAction/startSingleInstance', this.startSingleInstance)
        if (res.errorCode === '0000') {
          return this.$message.success('更改成功')
        } else {
          return this.$message.error('更改失败')
        }
      }
    },
}
</script>

<style scoped>
   .input {
    width: 160px;
  }
   .diaInput {
     width: 90%;
  }
</style>


<style scoped>
  .el-title{
    font-size: 22px;
    font-weight: 600;
    color: rgb(30, 28, 36);
    margin-bottom: 15px;
  }
  .el-list{
    font-size: 18px;
    font-weight: 600;
    color: rgb(65, 65, 68);
    margin-bottom: 15px;
  }
</style>