<template>
  <div class="navmenu-container">
    <!--<img style="padding-left:15px;" v-if="state.isCollapse" src="@/assets/image/welcome.png" alt="" width="24px">
    <span v-else class="name-title">ParkMyCloud</span>-->
    <span class="name-title">ParkMyCloud</span>
    <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" :collapse="state.isCollapse" router :unique-opened="true">
      <el-menu-item index="/Resources">
        <svg-icon icon-class="notice"></svg-icon>
        <span class="title-name">Resources</span>
      </el-menu-item>
      <!--
      <el-menu-item index="/Scheduling">
        <svg-icon icon-class="culture"></svg-icon>
        <span class="title-name">Scheduling</span>
      </el-menu-item>
      <el-menu-item index="/Rightsizing">
        <svg-icon icon-class="notice"></svg-icon>
        <span class="title-name">Rightsizing</span>
      </el-menu-item>
      -->
      <el-menu-item index="/Cloud_Credentials">
        <svg-icon icon-class="cloud"></svg-icon>
        <span class="title-name">Cloud Credentials</span>
      </el-menu-item>
      <!--
      <el-menu-item index="/Teams">
        <svg-icon icon-class="data"></svg-icon>
        <span class="title-name">Teams</span>
      </el-menu-item>
      <el-menu-item index="/Users">
        <svg-icon icon-class="login"></svg-icon>
        <span class="title-name">Users</span>
      </el-menu-item>
      <el-menu-item index="/Policies">
        <svg-icon icon-class="cloud"></svg-icon>
        <span class="title-name">Policies</span>
      </el-menu-item>
       <el-menu-item index="/Reports" v-if="role==='ADMIN'|| role==='TEA' || role==='STU'">
        <svg-icon icon-class="mycom"></svg-icon>
        <span class="title-name">Reports</span>
      </el-menu-item>
      <el-menu-item index="/Notifications">
        <svg-icon icon-class="edit"></svg-icon>
        <span class="title-name">Notifications</span>
      </el-menu-item>
      <el-menu-item index="/payment">
        <svg-icon icon-class="money"></svg-icon>
        <span class="title-name">Subscription</span>
      </el-menu-item>
      <el-menu-item index >
        <svg-icon icon-class="notice"></svg-icon>
        <span class="title-name" @click="goTarget('https://parkmycloud.atlassian.net/wiki/spaces/PMCUG/overview')">User Guide</span>
      </el-menu-item>
      <el-menu-item index >
        <svg-icon icon-class="mycom"></svg-icon>
        <span class="title-name" @click="goTarget('https://mysupport.parkmycloud.com/portal/kb')">Support</span>
      </el-menu-item>
      <el-menu-item index="/Api">
        <svg-icon icon-class="sysconfig"></svg-icon>
        <span class="title-name" >Api</span>
      </el-menu-item>
      -->
    </el-menu>
  </div>
</template>

<script>
import store from '@/utils/store'
  export default {
    data() {
      return {
        state: store.state,
        isCollapse: false,
        role: null
      }
    },
    created() {
      this.role = JSON.parse(sessionStorage.getItem('accountInfo')).role
    },
    methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    },
  }
</script>

<style scoped>
  .navmenu-container {
    background-color: #001528;
    height: 100%;
    /* overflow: auto; */
    overflow-x: hidden;
    overflow-y: scroll;
    width: calc( 100% + 20px);
  }
  .navmenu-container .el-menu-vertical-demo .svg-icon {
    width: 1.0em;
    height: 0.8em;
    vertical-align: -0.2em;
  }
  .el-menu-vertical-demo span {
    font-size: 14px;
  }
  .toggle-container {
    font-size: 14px;
    text-align: right;
    cursor: pointer;
    padding: 10px 25px 0 0;
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }
  .title-name {
    padding: 10px;
  }
  img {
    padding: 10px;
  }
  .name-title {
    font-size: 22px;
    color: #fff;
    display: inline-block;
    height: 60px;
    line-height: 70px;
    padding: 0 20px;
  }
</style>

<style>
  .el-menu {
    background-color: #001528;
  }
  .el-menu-item, .el-submenu__title {
    height: 40px;
    line-height: 45px;
    color: #D3D3DE;
  }
  .el-menu-item:hover,.el-menu-item.onlyFirst:hover,.el-submenu .el-submenu__title:hover {
    background-color: #0A345A;
  }
  .el-menu-item.is-active {
    color: #fff;
    background-color: #0090FF;
  }
  .el-menu-item.is-active.onlyFirst {
    color: #0090FF;
    background-color: #001528;
  }
  .el-submenu .el-menu-item {
    height: 35px;
    line-height: 35px;
  }
  .el-submenu.is-active>.el-submenu__title{
    color: #0090FF;
    background-color: #001528;
  }
</style>

