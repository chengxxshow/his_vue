<template>
    <el-container>
        <el-header style="text-align:left">
            <el-form>
                <el-date-picker v-model="startDate" type="date" placeholder="开始日期" 
                value-format="yyyy-MM-dd" size="mini">
                </el-date-picker>

                <el-date-picker v-model="endDate" type="date" placeholder="结束日期" 
                value-format="yyyy-MM-dd" size="mini">
                </el-date-picker>
                <el-button type="primary" @click="selectSchedulings" size="mini" >查询排班信息</el-button>
                <el-button type="success" @click="addRule" size="mini" icon="el-icon-circle-plus" >新增排班规则</el-button>
                 <el-button type="warning" icon="el-icon-star-off" @click="searchRuleAndAddSchesuling" size="mini" >查询排班规则/生成排班计划</el-button>
            </el-form>
        </el-header>
       
       <el-main>
            <el-table  :data="tableData" stripe style="width: 100%">
               <el-table-column prop="id" label="编号"  width="50">  </el-table-column>
                <el-table-column prop="SchedDate" label="排班日期" width="180"> </el-table-column>
                <el-table-column  prop="deptname"  label="科室名称"  width="180"></el-table-column>
                <el-table-column prop="realName" label="医生名称"> </el-table-column>
                <el-table-column prop="registname" label="号别"> </el-table-column>
                <el-table-column prop="Noon" label="午别"> </el-table-column>
                <el-table-column prop="registquota" label="挂号限额"> </el-table-column>
                <el-table-column prop="DelMark" label="状态" :formatter="showStatus"> </el-table-column>
            </el-table>
      </el-main>
      <el-footer>
          <el-pagination
              background
              @current-change="currentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="totalCount">
        </el-pagination>
      </el-footer>
<!-- 新增排班规则对话框  start-->
 <el-dialog title="新增排班规则" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item label="规则名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.rulename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="科室" :label-width="formLabelWidth">
         <el-select v-model="ruleForm.deptid"  placeholder="请选择科室">
            <el-option
              v-for="item in deptoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="门诊医生" :label-width="formLabelWidth">
         <el-select v-model="ruleForm.userid"  placeholder="请选择医生">
            <el-option
              v-for="item in docoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="星期" :label-width="formLabelWidth">
        <el-checkbox-group v-model="weekList" >
        <el-checkbox  label="w0">星期一上午</el-checkbox>
        <el-checkbox  label="w1">星期一下午</el-checkbox>
         <el-checkbox label="w2">星期二上午</el-checkbox>
        <el-checkbox  label="w3" >星期二下午</el-checkbox>
         <el-checkbox label="w4">星期三上午</el-checkbox>
        <el-checkbox  label="w5" >星期三下午</el-checkbox>
         <el-checkbox label="w6">星期四上午</el-checkbox>
        <el-checkbox label="w7" >星期四下午</el-checkbox>
         <el-checkbox label="w8">星期五上午</el-checkbox>
        <el-checkbox label="w9" >星期五下午</el-checkbox>
         <el-checkbox label="w10">星期六上午</el-checkbox>
        <el-checkbox label="w11">星期六下午</el-checkbox>
         <el-checkbox label="w12">星期日上午</el-checkbox>
        <el-checkbox label="w13">星期日下午</el-checkbox>
      </el-checkbox-group>

      </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRule">确 定</el-button>
      </div>
    </el-dialog>   
<!-- 新增排班规则对话框  end -->
<!-- 查询排班规则对话框  start-->
 <el-dialog title="查询排班规则" :visible.sync="dialogSearchFormVisible">
       <el-select v-model="ruleForm.deptid"  placeholder="请选择科室">
            <el-option
              v-for="item in deptoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
       <el-button type="primary" @click="getRules" size="mini" >查询排班规则</el-button>
       <el-table  :data="rulestableData" stripe style="width: 100%">
               <el-table-column prop="ID" label="编号"  width="50">  </el-table-column>
                <el-table-column prop="RuleName" label="规则名称" > </el-table-column>
                <el-table-column  prop="deptname"  label="科室名称" ></el-table-column>
                <el-table-column prop="realname" label="医生名称"> </el-table-column>
                <el-table-column prop="Week" label="午别"  width="180"> </el-table-column>
                <el-table-column prop="DelMark" label="状态" :formatter="showStatus"> </el-table-column>
        </el-table>

        <el-date-picker v-model="addStartDate" type="date" placeholder="开始日期" 
                value-format="yyyy-MM-dd" size="mini">
         </el-date-picker>

        <el-date-picker v-model="addEndDate" type="date" placeholder="结束日期" 
                value-format="yyyy-MM-dd" size="mini">
        </el-date-picker>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSearchFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddScheduling">生成排班计划</el-button>
      </div>
    </el-dialog>   
<!-- 查询排班规则对话框  end -->

    </el-container>


</template>


<script>
  export default {
    data() {
      return {
        startDate:'',
        endDate:'',
        page:'',
        count:'',
        tableData: [],
     
        //分页设计
        totalCount:0,
        currentPage:1,
        pageSize:10,


        showStatus:function(row,col){
            return row.DelMark==1?'有效':'无效'
        },

        //排班规则的对话框显示与隐藏
        dialogFormVisible:false,
        formLabelWidth: '120px',
        //科室信息假数据
        deptoptions: [{
          value: 1,
          label: '心血管内科'
        }, {
          value: 2,
          label: '神经内科'
        }, {
          value: 3,
          label: '神经内科'
        }, {
          value: 4,
          label: '普通内科'
        }, {
          value:5,
          label: '消化内科'
        }],
      
        //医生列表假数据
        docoptions: [{
          value: 1,
          label: '扁鹊'
        }, {
          value: 2,
          label: '范无病'
        }, {
          value: 3,
          label: '霍去病'
        }],
        ruleForm:{
           rulename:'',
           deptid:'',
           userid:'',
           week:'',
        },
        weekList:[],
        //查询排班规则对话框显隐性
        dialogSearchFormVisible:false,
        //排版规则列表
        rulestableData:[],
        addStartDate:'',
        addEndDate:'',
      }
    },
    methods:{
      currentChange(currPage) {//处理翻页的业务
        console.log('当前页'+currPage);
        this.axios("/neusys/scheduling/all?page="+currPage+"&count="+this.pageSize+"&startDate="+this.startDate+"&endDate="+this.endDate).then((resp)=>{
          //  console.log(resp.data.list)
             this.tableData=resp.data.list; 
             this.totalCount=resp.data.totalCount
        });
      
      },
      //根据时间段查询排班信息
      selectSchedulings:function(){
        this.axios("/neusys/scheduling/all?page="+this.currentPage+"&count="+this.pageSize+"&startDate="+this.startDate+"&endDate="+this.endDate).then((resp)=>{
            //console.log(resp.data.list)
             this.tableData=resp.data.list; 
             this.totalCount=resp.data.totalCount
        })
      },
      //点击新增排班规则 ，打开对话框
      addRule:function(){
         this.dialogFormVisible=true;
      },
      //保存排班规则
      saveRule:function(){
        //console.log("final weeklist:"+this.weekList)
        for(var i=0;i<14;i++){
           this.ruleForm.week+=this.weekList.includes('w'+i)?'1':'0'
        }
        //console.log(this.ruleForm)

        this.axios({url:"neusys/rule/addRule",method:"post",data:this.ruleForm}).then((resp)=>{
              this.dialogFormVisible=false;
             this.$message({type: 'success',message: resp.data.msg, showClose: true });
        })
       
      },
      //打开查询排版规则对话框
      searchRuleAndAddSchesuling:function(){
          this.dialogSearchFormVisible=true;
      },
      //查询排班规则
      getRules:function(){
          this.axios("/neusys/rule/all?page=1&count=100&deptID="+this.ruleForm.deptid).then((resp)=>{
            console.log(resp.data.list)
             this.rulestableData=resp.data.list; 

          })
      },
      //生成排班计划
      AddScheduling:function(){

      }

    },
    mounted:function(){
        this.axios("/neusys/scheduling/all?page="+this.currentPage+"&count="+this.pageSize+"&startDate="+this.startDate+"&endDate="+this.endDate).then((resp)=>{
            console.log(resp.data.list)
             this.tableData=resp.data.list; 
             this.totalCount=resp.data.totalCount
        })
    },
    
  }
</script>