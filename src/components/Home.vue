<template>
    <el-container>
        <el-header class="my_el-header">
            <div  class="title_txt">东软云his系统</div>
            <div class="user_txt" >
              <el-dropdown>
               <i class="el-icon-user-solid" style="margin-right: 15px"></i>
               <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
               </el-dropdown-menu>
                </el-dropdown>
                <span>欢迎 {{username}}</span>
            </div>
        
        </el-header>
        
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      username: sessionStorage.getItem("username")
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
