<template>
<div>
 <el-row :gutter="2">   
     <el-col :span="5">   
       <font color="red">*</font>
       <font style="font-size:13px;font-family:'Microsoft YaHei'">发票号:</font>&nbsp;
       <el-input  readonly placeholder="发票号" style="width: 110px"  again="left" size="mini" v-model="InvoiceNumber" >
       </el-input>
       </el-select>
     </el-col>
 </el-row>  

<hr/>

<el-row :gutter="2">
  <el-col :span="5">
  <div class="grid-content bg-purple">
       <font color="red">*</font>
       <font style="font-size:13px;font-family:'Microsoft YaHei'">病 历 号 :</font>&nbsp;
       <el-input  placeholder="输入病历号" style="width: 110px"  again="left" size="mini" v-model="CaseNumber" @blur="">
       </el-input>
       
  </div></el-col>
  <el-col :span="5">
  <div class="grid-content bg-purple">
       <font color="red">*</font>
       <font style="font-size:13px;font-family:'Microsoft YaHei'">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</font>&nbsp;
       <el-input  placeholder="输入姓名" style="width: 110px"  again="left" size="mini" v-model="RealName">
       </el-input>
       
  </div></el-col>
  <el-col :span="5">
  <div class="grid-content bg-purple">
      <font color="red">*</font>
      <font style="font-size:13px;font-family:'Microsoft YaHei'">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</font>&nbsp;
         <el-select  placeholder="选择性别" style="width: 110px" size="mini" v-model="Gender" >
           <el-option
                    v-for="item in sexList"
                    :key="item.ID"
                    :label="item.ConstantName"
                    :value="item.ID">
            </el-option>
         </el-select>
         
  </div>
  </el-col>
  <el-col :span="7">
  <div class="grid-content bg-purple">
    <font color="red">*</font>
    <font style="font-size:13px;font-family:'Microsoft YaHei'">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:</font>&nbsp;
         <el-input  placeholder="输入年龄" style="width: 110px"  again="left" size="mini" v-model="Age">
         </el-input>
         <font color="red">*</font>
         <el-select  placeholder="选择岁" style="width: 110px" size="mini" v-model="AgeType">
            <el-option label="岁" value="岁"></el-option>
            <el-option label="月" value="月"></el-option>
            <el-option label="天" value="天"></el-option>
         </el-select>
  </div>
  </el-col>
 </el-row>

<el-row :gutter="2">
  <el-col :span="5">
  <div class="grid-content bg-purple">
      <font style="font-size:13px;font-family:'Microsoft YaHei'">出生日期:</font>
         <el-date-picker
                      v-model="BirthDate"
                      type="date"
                      placeholder="出生日期"  size="mini" style="width: 124px" value-format="yyyy-MM-dd">
         </el-date-picker>
  </div>
  </el-col>

  <el-col :span="10">
  <div class="grid-content bg-purple">
  <font style="font-size:13px;font-family:'Microsoft YaHei'">身份证号:</font>&nbsp;&nbsp;&nbsp;
   <el-input  placeholder="在此输入身份证号" style="width: 230px" size="mini" v-model="IDnumber"></el-input>
  </div>
  </el-col>
  <el-col :span="9">
  <div class="grid-content bg-purple">
      <font style="font-size:13px;font-family:'Microsoft YaHei'">家庭住址:</font>&nbsp;
       <el-input  placeholder="在此输入家庭住址" style="width: 250px"  again="left" size="mini" v-model="HomeAddress">
       </el-input>
  </div>
  </el-col>
</el-row>

<el-row :gutter="2">
<el-col :span="5">
  <div class="grid-content bg-purple">
    <font color="red">*</font>
    <font style="font-size:13px;font-family:'Microsoft YaHei'">结算类别:</font>&nbsp;   
         <el-select  placeholder="结算类别" style="width: 100px" size="mini" v-model="SettleID">
              <el-option
                    v-for="item in settleCategories"
                    :key="item.ID"
                    :label="item.SettleName"
                    :value="item.ID">
              </el-option>
              
         </el-select>
  </div>
  </el-col>
  <el-col :span="5">
     <div class="grid-content bg-purple">
     <font color="red">*</font>
     <font style="font-size:13px;font-family:'Microsoft YaHei'">看诊日期:
     <el-date-picker
                  v-model="VisitDate"
                  type="date"
                  placeholder="看诊日期"  size="mini" style="width: 125px" value-format="yyyy-MM-dd"  @change="">
     </el-date-picker></font>
     </div>
  </el-col>
  <el-col :span="5">
  <div class="grid-content bg-purple">
    <font color="red">*</font>
    <font style="font-size:13px;font-family:'Microsoft YaHei'">午别:</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp   
         <el-select  placeholder="午别" style="width: 90px" size="mini" v-model="Noon" @change="select_ScheduDeptS">
          <el-option
                    v-for="item in noons"
                    :key="item.Noon"
                    :label="item.Noon"
                    :value="item.Noon">
          </el-option> 
   
         </el-select>
  </div>
  </el-col>

  <el-col :span="7">
     <div class="grid-content bg-purple">
     <font color="red">*</font>
     <font style="font-size:13px;font-family:'Microsoft YaHei'">挂号科室:</font>&nbsp;
     <el-select  placeholder="挂号科室" style="width: 108px" size="mini" v-model="deptid" @change="select_regLevel">
         <el-option
                    v-for="item in scheduDept"
                    :key="item.deptid"
                    :label="item.deptname"
                    :value="item.deptid">
          </el-option> 
     </el-select>
     </div>
  </el-col>
  </el-row>
<el-row :gutter="2">
  <el-col :span="5">
     <div class="grid-content bg-purple">
     <font color="red">*</font>
     <font style="font-size:13px;font-family:'Microsoft YaHei'">号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</font>&nbsp;
     
     <el-select  placeholder="号别" style="width: 100px" size="mini" v-model="RegistLeID" @change="select_doc">
          <el-option
                    v-for="item in regLivels"
                    :key="item.reglevid"
                     :label="item.registname"
                    :value="item.reglevid">
          </el-option> 
     </el-select>
     </div>
  </el-col>

  <el-col :span="5">
     <div class="grid-content bg-purple">
     <font color="red">*</font>
     <font style="font-size:13px;font-family:'Microsoft YaHei'">看诊医生:</font>
     <el-select  placeholder="看诊医生" style="width: 110px" size="mini" v-model="UserID"  @change="select_quota">
         <el-option
                    v-for="item in schedulingdocList"
                    :key="item.docid"
                    :label="item.realname"
                    :value="item.docid">
          </el-option> 
     </el-select>
     </div>
  </el-col>

  <el-col :span="5">
     <div class="grid-content bg-purple">
     <font style="font-size:13px;font-family:'Microsoft YaHei'">初始号额:</font>
      <el-input  placeholder="初始号额" style="width: 110px"  again="left" size="mini" v-model="cshe" readonly>
       </el-input>
     </div>
  </el-col>

  <el-col :span="7">
     <div class="grid-content bg-purple">
     <font style="font-size:13px;font-family:'Microsoft YaHei'">已用号额:</font>
      <el-input  placeholder="已用号额" style="width: 110px"  again="left" size="mini" v-model="yyhe" readonly>
       </el-input>
     </div>
  </el-col>
 </el-row>

<el-row :gutter="2">
  <el-col :span="5">
  <div class="grid-content bg-purple">
   
   <font style="font-size:13px;font-family:'Microsoft YaHei'">病历本</font>
   
   <input type="checkbox" name=""  v-model="IsBook"  true-value="1" false-value="0" 
        @change="" 
   />
  </div>
  </el-col>
  
  <el-col :span="5"><div class="grid-content bg-purple">
      <font color="red">*</font>
      <font style="font-size:13px;font-family:'Microsoft YaHei'">应收金额:</font>&nbsp;
               <el-input  placeholder="应收金额" style="width: 100px"  again="left" size="mini" v-model="Fee" readonly >
               </el-input>
      </div>
  </el-col>

  <el-col :span="5">
  <div class="grid-content bg-purple">
    <font color="red">*</font>
    <font style="font-size:13px;font-family:'Microsoft YaHei'">收费方式:</font>&nbsp;   
         <el-select  placeholder="收费方式" style="width: 100px" size="mini" v-model="FeeType">
             <el-option
                    v-for="item in FeeList"
                    :key="item.ID"
                    :label="item.ConstantName"
                    :value="item.ID">
              </el-option>
         </el-select>
  </div>
  </el-col>
</el-row>
<el-row >
    <el-col  :offset="6" :span="12"style="text-align:center">
         <el-button type="primary" icon="el-icon-edit-outline" size="mini" style="margin-left: 3px" @click="">挂号
        </el-button>

        <el-button type="primary" icon="el-icon-refresh" size="mini" style="margin-left: 3px" @click="">清空
        </el-button>

    </el-col>
</el-row>
</div>
</template>

<script>
 
  export default{
  mounted: function () {//页面加载调用
       //异步调用后台代码-更新发票号
       this.axios('/neughsf/invoice/getMaxInvoiceNumber').then((resp)=>{
            this.InvoiceNumber=parseInt(resp.data.invoicenum)
       })
       //异步调用后台代码-更新病历号
        this.axios('/neughsf/register/getMaxCaseNumber').then((resp)=>{
            this.CaseNumber=parseInt(resp.data.casenumber)
       })

       //异步查询 性别列表
          this.axios('/neusys/contantitem/getitemListBytypeCode?typecode=Gender').then((resp)=>{
            this.sexList=resp.data.list
       })
       //异步查询 收费方式列表
         this.axios('/neusys/contantitem/getitemListBytypeCode?typecode=FeeType').then((resp)=>{
            this.FeeList=resp.data.list
       })
       //异步查询 结算类别
         this.axios('/neusys/settleCategory/all').then((resp)=>{
            this.settleCategories=resp.data.list
       })
    },

    methods: {
       select_ScheduDeptS:function(){
           //根据看诊日期和午别查询科室
           var op={
               visitDate:this.VisitDate,
               noon:this.Noon
           }
            console.log("传参数据："+op)
           this.axios({url:"/neusys/scheduling/getDeptByVDateAndNoon",method:"post",data:op}).then((resp)=>{
             console.log("值班科室："+resp.data.list)
             this.scheduDept=resp.data.list
           })
       },
       select_regLevel:function(){
           //根据看诊日期,午别,科室 查询号别
           var op={
               visitDate:this.VisitDate,
               noon:this.Noon,
               deptId:this.deptid
           }
           this.axios({url:"/neusys/scheduling/getRegLevlByDateNoonDept",method:"post",data:op}).then((resp)=>{
             console.log("值班值班号别"+resp.data.list)
             this.regLivels=resp.data.list
           })
       },
       select_doc:function(){
          //根据看诊日期,午别,科室 ,号别 查询 医生
           var op={
               visitDate:this.VisitDate,
               noon:this.Noon,
               deptId:this.deptid,
               reglevid:this.RegistLeID
           }
           this.axios({url:"/neusys/scheduling/getDocByDateNoonDeptRegid",method:"post",data:op}).then((resp)=>{
             console.log("值班医生"+resp.data.list)
             this.schedulingdocList=resp.data.list
           })
       },
       select_quota:function(){
          //根据日期 午别  医生 查询 限号额度和挂号费
           var op={
               visitDate:this.VisitDate,
               noon:this.Noon,
               userId:this.UserID
           }
           this.axios({url:"/neusys/scheduling/getDocRegQuotaByDateNoon",method:"post",data:op}).then((resp)=>{
             this.cshe=resp.data.registquota
             this.Fee=resp.data.registfee
           })
       }
    },

    data(){
      return {
        CaseNumber: '',     //病历号
        RealName: '',       //真实姓名
        Gender: 71,         //性别 71=男  72=女
        IDnumber: '',       //身份证号',
        BirthDate: '',      //出生日期',
        Age: '',            //年龄',
        AgeType: '岁',      //年龄类型',  岁
        HomeAddress: '',    //家庭住址',
        VisitDate: '',      //本次看诊日期', 2019-2-1 ???
        Noon: '',           //午别', 
        deptid: '',         //本次挂号科室ID',
        UserID: '',         //本次挂号医生ID',
        RegistLeID: '',     //本次挂号级别ID',
        IsBook: '0',        //病历本要否',
        InvoiceNumber: '',  //发票号码',  
        RegisterTime: '',   //挂号时间',
        RegisterID: '',     //挂号员ID',
        Fee: '0',           //应收金额', 
        FeeType: 51,        //收费方式 51=现金 52=医保卡  
        SettleID: 1,        //结算类别ID', 1=自费 2=市医保
        cshe: '',           //初始号额', 
        yyhe: '',           //已用号额', 
        syhe: '',           //剩余号额', 
        

        sexList: [],   //性别列表
        FeeList: [],   //收费方式列表
        settleCategories: [],  //结算类型列表
        noons: [{Noon:'上午'},{Noon:'下午'}],  //午别列表
        regLivels: [],  //值班号别
        scheduDept: [],  //挂号科室=值班科室
        schedulingdocList: [],
      }
    }
  }
</script>
<style>
div{text-align: left;}

</style>