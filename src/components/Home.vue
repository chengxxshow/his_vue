<template>
    <el-container>
        <el-header class="my_el-header">
            <div  class="title_txt">东软云his系统</div>
            <div class="user_txt" >
              <el-dropdown  @command="handleCommand">
               <i class="el-icon-user-solid" style="margin-right: 15px"></i>
               <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="myinfo">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
               </el-dropdown-menu>
                </el-dropdown>
                <span>欢迎 {{username}}</span>
            </div>
        
        </el-header>
        
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>

  <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.psw" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>   

</el-container>

 
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      username: sessionStorage.getItem("username"),
      dialogFormVisible: false,
      form:{
        name:"",
        psw:""
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
      handleCommand(command) {
        //this.$message('click on item ' + command);
        //退出
        if(command=="logout"){
         this.$confirm('确定退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           this.axios("/user/logOut").then((resp)=>{
             //退出：清除sessionStorage  ，跳转到登录页面
              sessionStorage.removeItem("uId")
              sessionStorage.removeItem("username")
              sessionStorage.removeItem("uType")
              sessionStorage.removeItem("Loginflag")
              this.$router.replace({path:"/"})
           })
        })
      }

      if(command=="myinfo"){
          this.dialogFormVisible = true
          //初始个人信息模态框：查询用户信息
          let uid=sessionStorage.getItem("uId");
          console.log(uid)
          var this_=this
          this.axios("/user/getUserById?id="+uid).then((resp)=>{
            console.log(this_.form,)
            this_.form.name=resp.data.username
            this_.form.psw=resp.data.password
          })
      }

    }
  }
  

}
</script>
<style>

  .my_el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    display:flex;
    align-items: center;
    justify-content: space-between;
  }
  .title_txt{
      display:inline;
      color:blue;
  }
  .user_txt{
     display:inline;
     text-align: right; 
     font-size: 12px;
  }
  
  .el-aside {
    color: #333;
  }

</style>
