<template>
  <div class="layout-aside-container" style="background-color:rgb(91, 192, 222)">
    <!-- 左侧边栏列表 -->
    <ul class="user-select-none menu" style="background-color:white">
      <li class="menu-item">
        <router-link to="/home/main">主页面</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/goods">订单信息</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/client">用户信息</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MyAside',
}
</script>

<style lang="less" scoped>
.layout-aside-container {
  // width: 20%;
  // height: 600px;
  border-right: 1px solid #eaeaea;
  width: 20%;
  height: 100%;
  position: absolute;
}

.menu {
  list-style-type: none;
  padding: 0;
  .menu-item {
    line-height: 50px;
    font-weight: bold;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &:hover {
      background-color: #efefef;
      cursor: pointer;
    }
    a {
      display: block;
      color: black;
      padding-left: 30px;
      &:hover {
        text-decoration: none;
      }
    }
  }
}

// 设置路由高亮效果
.router-link-active {
  background-color: #efefef;
  box-sizing: border-box;
  position: relative;
  // 伪元素实现路由高亮效果
  &::before {
    content: ' ';
    display: block;
    width: 4px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgb(91, 192, 222);
  }
}
</style>
