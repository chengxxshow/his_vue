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
                <span>欢迎 {{userName}}</span>
            </div>
        
        </el-header>

        <el-container>
           <el-aside width="200px">
                <!-- <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  @select="addTab(editableTabsValue)">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span  slot="title">挂号收费</span>
                    </template>
                    
                      <el-menu-item index="1-1">现场挂号</el-menu-item>
                      <el-menu-item index="1-2">收费</el-menu-item>
                      <el-menu-item index="1-3">退费</el-menu-item>
                      <el-menu-item index="1-4">费用查询</el-menu-item>
                  </el-submenu>
                 
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">门诊医生</span>
                  </el-menu-item>
                  <el-menu-item index="3" >
                    <i class="el-icon-document"></i>
                    <span slot="title">医技医生</span>
                  </el-menu-item>
                  <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">药房管理</span>
                  </el-menu-item>

                  <el-submenu index="5">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span  slot="title">系统管理</span>
                    </template>
                    
                      <el-menu-item index="5-1">用户管理</el-menu-item>
                      <el-menu-item index="5-2">科室管理</el-menu-item>
                      <el-menu-item index="5-3">费用管理</el-menu-item>
                      <el-menu-item index="5-4">菜单管理</el-menu-item>
                      <el-menu-item index="5-5">权限管理</el-menu-item>
                  </el-submenu>
                </el-menu> -->
             <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  @select="addTab">
                <template v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden">
                  <el-submenu :index="index+''" :key="index" >
                    <template slot="title">
                      <i :class="item.iconCls"></i>
                      <span  slot="title">{{item.name}}</span>
                    </template>
                     <!-- 一级菜单的子菜单 -->
                     <el-menu-item  v-for="child in item.children" :index="child.path" :key="child.path">
                        {{child.name}}
                     </el-menu-item>
                  </el-submenu>
                
                </template>  

             
         
            </el-menu>

           </el-aside>
           <el-main>
             <div style="background:pink;width:100%;height:400px;">
              <el-tabs v-model="editableTabsValue" type="border-card" closable @edit="handleTabsEdit" @tab-click="showContent">
              <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                :route="item.route"
              >
                <router-view/>
              </el-tab-pane>
            </el-tabs>
             </div>
              
           </el-main>
        </el-container>
        
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
      userName: sessionStorage.getItem("userName"),
      dialogFormVisible: false,
      form:{
        name:"",
        psw:""
      },
      formLabelWidth: '120px',
      //有关tabs
      editableTabsValue: '2',
      editableTabs: [],
      tabIndex: 2
      
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
              sessionStorage.removeItem("userName")
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
            this_.form.name=resp.data.userName
            this_.form.psw=resp.data.password
          })
      }

    },
    //菜单更新tab
      addTab(index) {
        console.log(index)  //path
        // let newTabName = (++this.tabIndex)+ '';
        // this.editableTabs.push({
        //   title: 'New Tab'+newTabName,
        //   name: newTabName,
        //   content: 'New Tab content'
        // });
        // this.editableTabsValue = newTabName;

          if (index) {
           let componet = this.findCompontByPath(index);
            console.log(componet);
          if (componet) {
            if (!this.editableTabs.some(t => t.name == componet.path)) {
              this.editableTabs.push({
                title: componet.name,
                name: componet.path,
                route: componet.path
              });
            }
            this.editableTabsValue = componet.path;
            this.$router.push(componet.path);
          }
        }
      },
      handleTabsEdit(targetName, action) {
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          this.$router.push(activeName)
        }
      },
    
    //自定义方法：通过路劲查找组件
     findCompontByPath(path) {
        for (let r of this.$router.options.routes) {
          if (r.children) {
            let a = r.children.find(c => c.path == path);
            if (a) {
              return a;
            }
          }
        }
        return null;
      },
    //tab页点击事件
    showContent(tag){
     this.$router.push(tag.name)
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
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
