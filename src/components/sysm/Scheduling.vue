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
        <el-checkbox-group v-model="ruleForm.week">
        <el-checkbox label="星期一上午" true-value="1" false-value="0"></el-checkbox>
        <el-checkbox label="星期一下午" true-value="1" false-value="0"></el-checkbox>
         <el-checkbox label="星期二上午" true-value="1" false-value="0"></el-checkbox>
        <el-checkbox label="星期二下午" true-value="1" false-value="0"></el-checkbox>
         <el-checkbox label="星期三上午" true-value="1" false-value="0"></el-checkbox>
        <el-checkbox label="星期三下午" true-value="1" false-value="0"></el-checkbox>
         <el-checkbox label="星期四上午" true-value="1" false-value="0"></el-checkbox>
        <el-checkbox label="星期四下午" true-value="1" false-value="0"></el-checkbox>
         <el-checkbox label="星期五上午" true-value="1" false-value="0"></el-checkbox>
        <el-checkbox label="星期五下午" true-value="1" false-value="0"></el-checkbox>
         <el-checkbox label="星期六上午" true-value="1" false-value="0"></el-checkbox>
        <el-checkbox label="星期六下午" true-value="1" false-value="0"></el-checkbox>
         <el-checkbox label="星期日上午" true-value="1" false-value="0"></el-checkbox>
        <el-checkbox label="星期日下午" true-value="1" false-value="0"></el-checkbox>
      </el-checkbox-group>

      </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRule">确 定</el-button>
      </div>
    </el-dialog>   
<!-- 新增排班规则对话框  start -->


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
          value: '1',
          label: '心血管内科'
        }, {
          value: '2',
          label: '神经内科'
        }, {
          value: '3',
          label: '神经内科'
        }, {
          value: '4',
          label: '普通内科'
        }, {
          value: '5',
          label: '消化内科'
        }],
      
        //医生列表假数据
        docoptions: [{
          value: '1',
          label: '扁鹊'
        }, {
          value: '2',
          label: '范无病'
        }, {
          value: '3',
          label: '霍去病'
        }],
        ruleForm:{
           rulename:'',
           deptid:'',
           userid:'',
           week:[]
        }
       
      }
    },
    methods:{
      currentChange(currPage) {//处理翻页的业务
        console.log('当前页'+currPage);
        this.axios("/neusys/scheduling/all?page="+currPage+"&count="+this.pageSize+"&startDate="+this.startDate+"&endDate="+this.endDate).then((resp)=>{
            console.log(resp.data.list)
             this.tableData=resp.data.list; 
             this.totalCount=resp.data.totalCount
        });
      
      },
      //根据时间段查询排班信息
      selectSchedulings:function(){
        this.axios("/neusys/scheduling/all?page="+this.currentPage+"&count="+this.pageSize+"&startDate="+this.startDate+"&endDate="+this.endDate).then((resp)=>{
            console.log(resp.data.list)
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
        console.log(this.ruleForm)
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