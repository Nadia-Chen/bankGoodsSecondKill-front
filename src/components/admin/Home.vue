<template lang="">
  <!-- 头部 -->
  <el-container class="home_container">
    <el-header>
      <div class="title">
        <span>后台管理系统</span>
      </div>
      <div class="quit">
        <el-button type="primary" @click="loginOut">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左边菜单部分 -->
        <el-aside :width="isCollapse ? '64px' : '225px'">
          <!-- 收起导航栏 -->
          <div
            class=""
            style="
              color: #545c64;
              background: rgba(149, 200, 229, 100);
              cursor: pointer;
              text-align: center;
            "
            @click="isCollapse = !isCollapse"
          >
            |||
          </div>
          <el-menu
            :default-active="activePath"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            :router="true"
            :collapse="isCollapse"
          >
            <el-menu-item
              index="/userManage"
              class="user"
              @click="activeChoose('/userManage')"
            >
              <el-icon><edit /></el-icon>
              <template #title>用户管理</template>
            </el-menu-item>
            <el-menu-item
              index="/activityManage"
              class="game"
              @click="activeChoose('/activityManage')"
            >
              <el-icon><edit /></el-icon>
              <template #title>秒杀活动管理</template>
            </el-menu-item>
            <el-menu-item
              index="/productManage"
              class="game"
              @click="activeChoose('/productManage')"
            >
              <el-icon><edit /></el-icon>
              <template #title>商品管理</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
      <el-main
        :style="{
          left: this.isCollapse ? '64px' : '225px',
          width: this.isCollapse ? '95.05%' : '82.8%',
        }"
      >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      menuList: [],
      isCollapse: false,
      activePath: '',
    }
  },
  methods: {
    //退出登录
    loginOut() {
      console.log("开始退出");
      window.sessionStorage.clear()
      //跳转到登录页面
      this.$router.push('/adminLogin')
    },
    activeChoose(path) {
      window.localStorage.setItem('path', path)
      this.activePath = path
    },
  },

  watch: {
    $route: function (to, from) {
      switch (to.path) {
        case '/productManage':
          this.activePath = '/productManage'
          break
        case '/userManage':
          this.activePath = '/userManage'
          break
        case '/activityManage':
          this.activePath = '/activityManage'
          break
      }
    },
  },
  created() {
    switch (this.$route.path) {
      case '/productManage':
        this.activePath = '/productManage'
        break
      case '/userManage':
        this.activePath = '/userManage'
        break
      case '/activityManage':
        this.activePath = '/activityManage'
        break
    }
  },
  beforeCreate() {
    // 修改背景色
    let that = this
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#fff')
    let loginStatus = window.sessionStorage.getItem('adminLogin')
    if (loginStatus !== 'true') {
      that.$message.error('请先登录')
      this.$router.push('/adminLogin')
    }
  },
}
</script>

<style>
html {
  overflow: hidden;
}

body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.home_container {
  height: 100%;
}

.el-header {
  display: flex;
  position: relative;
  justify-content: space-between;
  height: 100px !important;
  line-height: 100px;
  background-color: rgba(2, 153, 208, 1);
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  padding-left: 250px !important;
}

.el-aside {
  height: 100%;
  display: block;
  position: absolute;
  background-color: rgba(2, 153, 208, 1);
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
  box-shadow: 1px 12px 9px 12px rgba(0, 0, 0, 0.2);
}

.el-main {
  height: 85%;
  position: absolute;
}

.quit .el-button {
  width: 80px;
  background-color: rgba(0, 0, 0, 0);
  border-color: #fff;
  margin-right: 60px;
  border-radius: 25px;
  font-size: 18px;
}

.quit .el-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.nav {
  text-align: left;
}
</style>