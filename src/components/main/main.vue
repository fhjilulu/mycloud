<template>
  <el-container>
    <el-aside :width="state.asideWidth" ><nav-menu></nav-menu></el-aside>
    <el-container>
      <el-header height="50px"><nav-header></nav-header></el-header>
      <el-main><main-content></main-content></el-main>
    </el-container>
  </el-container>
</template>

<script>
  import store from '@/utils/store'
  import navHeader from '@/components/layout/navHeader'
  import breadcrumb from '@/components/layout/breadcrumb'
  import navMenu from '@/components/layout/navMenu'
  import mainContent from '@/components/layout/mainContent'
  export default {
    components: {
      navHeader,
      breadcrumb,
      navMenu,
      mainContent,
    },
    data() {
      return {
        state: store.state,
      }
    },
  }
</script>

<style scoped>
  .el-header {
    padding: 0;
    width: 100%;
    color: #333;
    box-sizing: border-box;
  }
  
  .el-aside {
    background-color: #fff;
    color: #808080;
    text-align: left;
    overflow: hidden;
    /* line-height: 180px; */
    height: 100%;
    transition: width 0.5s;
  }
  
  .el-main {
    background-color: #F3F7FD;
    color: #333;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 0;
  }
  .el-footer {
    width: 100%;
    text-align: center;
    line-height: 40px;
    background-color: #fff;
  }

  .el-container {
    width: 100%;
    height: 100%;
  }
</style>

