<template>
    <el-container >
        <!-- 查询患者 -->
        <el-aside >
            <el-container>
                <el-header style="line-height:40px;height:40px;">
                     <el-row>
                        <el-col :span="18">
                            <el-input placeholder="请输入病例号或姓名" v-model="patientInfo" size="mini"  ></el-input>
                        </el-col>
                         <el-col :span="6">
                             <el-button @click="select_patient" type="primary" icon="el-icon-search" circle size="mini"></el-button>
                         </el-col>
                    </el-row>
                    </el-header>
                <el-main style="line-height:10px;text-align: left;">
                      <el-tag  size="medium">待诊患者列表(共<span style="color:orange;margin:0 3px">{{count01}}</span>条数据）</el-tag> 
                     <el-table   stripe :data="registerTable"  highlight-current-row  @current-change="handleCurrentChange" style="height:50%">
                        <el-table-column  property="casenumber" label="病历号" width="100"> </el-table-column>
                        <el-table-column  property="realname" label="姓名" width="80"> </el-table-column>
                        <el-table-column  property="age" label="年龄" width="50"> </el-table-column>
                     </el-table>
                     <el-tag  size="medium">已诊患者列表(共<span style="color:orange;margin:0 3px" >{{count02}}</span>条数据)</el-tag>
                     <el-table  stripe :data="registerTable2"  highlight-current-row  @current-change="handleCurrentChange"  style="height:50%">
                        <el-table-column  property="casenumber" label="病历号" width="100"> </el-table-column>
                        <el-table-column  property="realname" label="姓名" width="80"> </el-table-column>
                        <el-table-column  property="age" label="年龄" width="50"> </el-table-column>
                     </el-table>
                </el-main>
            </el-container>
        </el-aside>
       <!-- 医生操作区 -->
       <el-container >
           <el-header style="line-height:30px;height:30px;text-align:left;padding:0">
                 <el-tag>{{checkedPatientStop}}</el-tag>
           </el-header>
           
            <!-- 在tab页中加载组件 -->
           <el-tabs type="border-card"style="width:100%" v-model="tabActiveName">
                <el-tab-pane label="病例首页" name="first">
                    <MZBL ref="MZBL"></MZBL>
                </el-tab-pane>
                <el-tab-pane label="检查申请" name="second">
                    <JCSQ ref="JCSQ"></JCSQ>
                </el-tab-pane>
                <el-tab-pane label="成药处方" name="third">
                    <CYCF ref="CYCF"></CYCF>
                </el-tab-pane>
               
            </el-tabs>
          
           
       </el-container>
    </el-container>
</template>

<script>
import MZBL from './homesub/MZBL.vue'
import CYCF from './homesub/CYCF.vue'
import JCSQ from './homesub/JCSQ.vue'
export default {
    name: 'DHome',
    components:{
        MZBL,CYCF,JCSQ
    },
    data(){
        return{
           patientInfo:'',
           registerTable:[],
           registerTable2:[],
           count01:0,
           count02:0,
           currentRow:'',
           checkedPatientStop:'请选择患者', //存储备选中的患者信息
           tabActiveName:'first'
       }
    },
    methods: {
       select_patient:function(){
           alert("根据病例号或姓名查询患者")
       },
        handleCurrentChange(val) {
        this.currentRow = val;
        var s1='',s2='';
        if(val.visitstate==1){
           s1="待诊"
        }else if(val.visitstate==2){
           s1="正在看诊"
        }else if(val.visitstate==3){
            s1='诊毕'
        }else{
            s1='已退号'
        }
        if(val.gender==1){
           s2="男"
        }else{
            s2="女"
        }
        this.checkedPatientStop="就诊状态："+s1+" 病历号："+val.casenumber+" 姓名："+val.realname+" 性别："+s2+" 年龄："+val.age+val.agetype
      },
    },
    mounted: function () {//页面加载调用
       var  docid=sessionStorage.getItem("uId")
        //查询带诊患者
        this.axios({url:"/neughsf/register/getRegListByDoc?state=1&docid="+docid,method:"get"}).then((resp)=>{
            console.log("带诊患者:"+resp.data.list)
            this.registerTable=resp.data.list
            this.count01=resp.data.count
        })
        //查询接诊患者
        this.axios({url:"/neughsf/register/getRegListByDoc?state=2&docid="+docid,method:"get"}).then((resp)=>{
           console.log("接诊患者:"+resp.data.list)
            this.registerTable2=resp.data.list
             this.count02= resp.data.count
        })
    }
    

}
</script>