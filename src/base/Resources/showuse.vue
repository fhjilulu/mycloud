<template>
   <div class="user-container">
     <div class="base-container">
       <div class="form-container">
           <br/><h1>资源使用详情</h1><br/>
           <div>
              <el-row :gutter="20">
              <el-col :span="3"> <br/> </el-col>
              <el-col :span="14" >
                <el-form :inline="true" ref="CPUInfo" :model="CPUInfo.parameter" :rules="rules" size="medium" label-width="80px">
                  <el-form-item label="Start Data" prop="startDate">
                   <el-date-picker v-model="CPUInfo.parameter.startDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    :style="{width: '100%'}" placeholder="请选择开始时间" clearable></el-date-picker>
               </el-form-item> 
               <el-form-item label="End Data" prop="endDate">
                  <el-date-picker v-model="CPUInfo.parameter.endDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                      :style="{width: '100%'}" placeholder="请选择结束时间" clearable></el-date-picker>
                 </el-form-item>
              </el-form>
              </el-col>
              <!--<el-col :span="5" > 
              <div>
              <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="70px">
                <el-form-item label="Show as" prop="graph">
                 <el-radio-group v-model="formData.graph" size="medium">
                 <el-radio v-for="(item, index) in graphOptions" :key="index" :label="item.value"
                     :disabled="item.disabled">{{item.label}}</el-radio>
                 </el-radio-group>
                </el-form-item>
              </el-form>
              </div>
              </el-col>-->
              <el-col :span="7" > 
              <el-button icon="el-icon-search" circle @click="showuse1('CPUInfo')">查询id为{{this.CPUInfo.parameter.instanceId}}的资源使用情况</el-button> </el-col>
              </el-row>
              </div>
              CPU指标：
         <div id="chartLineBox" style="width: 100%;height: 70vh;" > </div>
              内存指标：
         <div id="chartLineBox1" style="width: 100%;height: 70vh;" > </div>
       </div>
     </div>
     </div>
</template>

<script>
import { myGet,myPost,login } from "@/api/http";
import echarts from 'echarts'
export default {
   data () {
     return {
      Id:"",
      Obj: {//定义的变量用来存储获取过来的数据
            XData: [],
            XData1: [],
            min:[],
            max:[],
            ave:[],
            min1:[],
            max1:[],
            ave1:[]
		      },
      CPUInfo: {
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
        typeName:'metricAction.instanceCpu',
        instanceId:'',
        startDate:'2021-01-20',
        endDate:'2021-01-25'
        }
      },
      rules: {
        startDate: [{
          required: true,
          message: '请选择开始时间',
          trigger: 'change'
        }],
        endDate: [{
          required: true,
          message: '请选择结束时间',
          trigger: 'change'
        }],
      },
      formData: {
        graph: undefined,
      },
      graphOptions: [{
        "label": "Heatmaps",
        "value": "Heatmaps"
      }, {
        "label": "Line Graph",
        "value": "Line Graph"
      }],
    }
  },
  created(){
    this.getParams()
  },
  watch: {
   '$route': 'getParams'
  },
  mounted(){
    //this.drawLine();
    this.chartLine = echarts.init(document.getElementById('chartLineBox'));
    this.chartLine1 = echarts.init(document.getElementById('chartLineBox1'));
        // 指定图表的配置项和数据
        var option = {
            tooltip: {              //设置tip提示
                trigger: 'axis'
            },
            
            legend: {               //设置区分（哪条线属于什么）
                data:['最高使用率','最低使用率','平均使用率']
            },
            color: ['#8AE09F', '#FA6F53','#999'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
                type: 'category',
                boundaryGap: false,     //坐标轴两边不留白
                data: this.Obj.XData,
                name: 'DATE',           //X轴 name
                nameTextStyle: {        //坐标轴名称的文字样式
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 0, 20]
                },
                //axisLine: {             //坐标轴轴线相关设置。
                //    lineStyle: {
                //        color: '#FA6F53',
                //    }
                //}
            },
            yAxis: {
                name: 'CPU utilization',
                scale:true,
                nameTextStyle: {
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 10, 0]
                },
                axisLine: {
                    lineStyle: {
                        color: '#FA6F53',
                    }
                },
                type: 'value'
            },
            series: [
              {
                name: '最高使用率',
                data:  this.Obj.max,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#8AE09F',
                    }
                },
              },
              {
                name: '最低使用率',
                data: this.Obj.min,
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#FA6F53',
                    }
                },
              },
              {
                name: '平均使用率',
                data:  this.Obj.ave,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#999',
                    }
                },
              },
          ]
        };
        var option1 = {
            tooltip: {              //设置tip提示
                trigger: 'axis'
            },
            
            legend: {               //设置区分（哪条线属于什么）
                data:['最高使用率','最低使用率','平均使用率']
            },
            color: ['#8AE09F', '#FA6F53','#999'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
                type: 'category',
                boundaryGap: false,     //坐标轴两边不留白
                data: this.Obj.XData,
                name: 'DATE',           //X轴 name
                nameTextStyle: {        //坐标轴名称的文字样式
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 0, 20]
                },
                //axisLine: {             //坐标轴轴线相关设置。
                //    lineStyle: {
                //        color: '#FA6F53',
                //    }
                //}
            },
            yAxis: {
                name: 'Memory utilization',
                scale:true,
                nameTextStyle: {
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 10, 0]
                },
                axisLine: {
                    lineStyle: {
                        color: '#FA6F53',
                    }
                },
                type: 'value' 
            },
            series: [
              {
                name: '最高使用率',
                data:  this.Obj.max,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#8AE09F',
                    }
                },
              },
              {
                name: '最低使用率',
                data: this.Obj.min,
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#FA6F53',
                    }
                },
              },
              {
                name: '平均使用率',
                data:  this.Obj.ave,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#999',
                    }
                },
              },
          ]
        };                        
 
        // 使用刚指定的配置项和数据显示图表。
        this.chartLine.setOption(option);
        this.chartLine1.setOption(option1);
    },
  methods: {
     getParams(){
    // 取到路由带过来的参数
    const showid=this.$route.query.id
    //将数据放在当前组件的数据内
    this.CPUInfo.parameter.instanceId=showid
    this.Id=showid
    //this.keyupMallName()
    },
    drawLine(){
        this.chartLine = echarts.init(document.getElementById('chartLineBox'));
        // 绘制图表
        this.chartLine.setOption({
            tooltip: {              //设置tip提示
                trigger: 'axis'
            },
            
            legend: {               //设置区分（哪条线属于什么）
                data:['最高使用率','最低使用率','平均使用率']
            },
            color: ['#8AE09F', '#FA6F53','#999'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
                type: 'category',
                axisLabel: {
                 interval: 32
                },
                boundaryGap: false,     //坐标轴两边不留白
                data: this.Obj.XData,
                name: 'DATE',           //X轴 name
                nameTextStyle: {        //坐标轴名称的文字样式
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 0, 20]
                },
                axisLine: {             //坐标轴轴线相关设置。
                    lineStyle: {
                        color: '#FA6F53',
                    }
                }
            },
            yAxis: {
                name: 'CPU utilization',
                nameTextStyle: {
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 10, 0]
                },
                axisLine: {
                    lineStyle: {
                        color: '#FA6F53',
                    }
                },
                type: 'value'
            },
            series: [
              {
                name: '最高使用率',
                data:  this.Obj.max,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#8AE09F',
                    }
                },
              },
              {
                name: '最低使用率',
                data: this.Obj.min,
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#FA6F53',
                    }
                },
              },
              {
                name: '平均使用率',
                data:  this.Obj.ave,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#999',
                    }
                },
              },
          ]
        });
    },
    drawLine1(){
        this.chartLine1 = echarts.init(document.getElementById('chartLineBox1'));
        // 绘制图表
        this.chartLine1.setOption({
            tooltip: {              //设置tip提示
                trigger: 'axis'
            },
            
            legend: {               //设置区分（哪条线属于什么）
                data:['最高使用率','最低使用率','平均使用率']
            },
            color: ['#8AE09F', '#FA6F53','#999'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
                type: 'category',
                axisLabel: {
                 interval: 32
                },
                boundaryGap: false,     //坐标轴两边不留白
                data: this.Obj.XData1,
                name: 'DATE',           //X轴 name
                nameTextStyle: {        //坐标轴名称的文字样式
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 0, 20]
                },
                axisLine: {             //坐标轴轴线相关设置。
                    lineStyle: {
                        color: '#FA6F53',
                    }
                }
            },
            yAxis: {
                name: 'Memory utilization',
                nameTextStyle: {
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 10, 0]
                },
                axisLine: {
                    lineStyle: {
                        color: '#FA6F53',
                    }
                },
                type: 'value'
            },
            series: [
              {
                name: '最高使用率',
                data:  this.Obj.max1,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#8AE09F',
                    }
                },
              },
              {
                name: '最低使用率',
                data: this.Obj.min1,
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#FA6F53',
                    }
                },
              },
              {
                name: '平均使用率',
                data:  this.Obj.ave1,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#999',
                    }
                },
              },
          ]
        });
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    showuse1(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.Obj.XData=[];
          this.Obj.max=[];
          this.Obj.min=[];
          this.Obj.ave=[];
          this.Obj.XData1=[];
          this.Obj.max1=[];
          this.Obj.min1=[];
          this.Obj.ave1=[];
          myPost("/metricAction/instanceCpu",this.CPUInfo)
          .then(res => {
            if (res.data.errorCode === '0000') {
            //this.$message.success('查询成功，若无曲线图，则表示该资源未使用');
            var jsonObj = JSON.parse(JSON.stringify(res.data.result.datapoints));
							//console.log("增加内容前："+JSON.stringify(jsonObj));
							for (var i = 0; i < jsonObj.length; i++) {
                //Math.round(new Date() / 1000)
                var CrDate = new Date();
                CrDate.setTime(jsonObj[jsonObj.length-i-1].timestamp);//其中data为需要被转化的linux时间戳 1490778706000
                var createDate = CrDate.toLocaleString(); //被转换为标准的时间格式 2017/3/29 下午5:11:46
                this.Obj.XData[i]=createDate;
                //this.Obj.XData[i]=jsonObj[i].timestamp;
                this.Obj.max[i]=jsonObj[jsonObj.length-i-1].maximum;
                this.Obj.min[i]=jsonObj[jsonObj.length-i-1].minimum;
                this.Obj.ave[i]=jsonObj[jsonObj.length-i-1].average;
              };
              this.drawLine();
						}
           // else{
           // this.$alert(res.data.errorMsg,'警告',{
           //     confirmButtonClass: "el-button--myPrimary",
           //     type: "warning"
           //  })}
        })
        myPost("/metricAction/instanceMemory",{
        sessionId: '123',
        version: '1.0',
        osVersion: 'win8',
        parameter: {
        typeName:'metricAction.instanceMemory',
        instanceId:this.CPUInfo.parameter.instanceId,
        startDate:this.CPUInfo.parameter.startDate,
        endDate:this.CPUInfo.parameter.endDate
        }})
          .then(res => {
            if (res.data.errorCode === '0000') {
            this.$message.success('查询成功，若无曲线图，则表示该资源未使用');
            var jsonObj = JSON.parse(JSON.stringify(res.data.result.datapoints));
							//console.log("增加内容前："+JSON.stringify(jsonObj));
							for (var i = 0; i < jsonObj.length; i++) {
                //Math.round(new Date() / 1000)
                var CrDate = new Date();
                CrDate.setTime(jsonObj[jsonObj.length-i-1].timestamp);//其中data为需要被转化的linux时间戳 1490778706000
                var createDate = CrDate.toLocaleString(); //被转换为标准的时间格式 2017/3/29 下午5:11:46
                this.Obj.XData1[i]=createDate;
                //this.Obj.XData[i]=jsonObj[i].timestamp;
                this.Obj.max1[i]=jsonObj[jsonObj.length-i-1].maximum;
                this.Obj.min1[i]=jsonObj[jsonObj.length-i-1].minimum;
                this.Obj.ave1[i]=jsonObj[jsonObj.length-i-1].average;
              };
              this.drawLine1();
						}
            else{
            this.$alert(res.data.errorMsg,'警告',{
                confirmButtonClass: "el-button--myPrimary",
                type: "warning"
              })}
        })
      }
      }) 
    },
  }
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
