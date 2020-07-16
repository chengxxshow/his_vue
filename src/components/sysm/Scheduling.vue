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
                <el-button type="primary" @click="" size="mini" >查询排班信息</el-button>
            </el-form>
        </el-header>
       
       <el-main>
            <el-table  :data="tableData" stripe style="width: 100%">
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
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
      </el-footer>
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
        showStatus:function(row,col){
            return row.DelMark==1?'有效':'无效'
        }
      }
    },
    methods:{},
    mounted:function(){
        this.axios("/neusys/scheduling/all?page=1&count=10&startDate="+this.startDate+"&endDate="+this.endDate).then((resp)=>{
            console.log(resp.data.list)
             this.tableData=resp.data.list; 
        })
    },
    
  }
</script>