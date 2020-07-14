<template>
  <div class="hello">
    <h1 class="el-icon-platform-eleme">{{ msg }}</h1>
      <el-button type="primary" icon="el-icon-user-solid">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'chengxiuxiu  Vue -springboot'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
