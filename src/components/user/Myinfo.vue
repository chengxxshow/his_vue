<template>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" >
                <h2 >东软云his系统</h2>
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('form')">登录</el-button>
                </el-form-item>
    </el-form>
</template>

