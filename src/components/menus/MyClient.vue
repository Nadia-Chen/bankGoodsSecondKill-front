<template>
  <h4 class="text-center">用户信息</h4>
  <!-- 获取并展示用户的全部信息 -->
  <!-- name id_card_number age nickname gender phone_number email address deposit -->
  <div class="wrapper">
    <div class="table-basic">
      <p style="text-align: center; font-weight: 700; font-size: larger; margin: 10px 10px">基础信息</p>
      <p style="margin-top: 1rem;">姓名:</p>
      <p>昵称:</p>
      <p>性别:</p>
      <p>电话号码:</p>
      <p>邮箱:</p>
      <p>住址:</p>
    </div>
    <div class="table-finantial">
      <p style="text-align: center; font-weight: 700; font-size: larger;">账户信息</p>
      <p style="margin-top: 1rem;">卡号:</p>
      <p>借款金额:</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyClient',
}
</script>

<style lang="less" scoped>
.wrapper{
  display: flex;
}
.table-basic{
  margin: 20px;
  float:left;
  width:500px;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 5px;
  background-color: #FFF5EE;
  p{
    margin-left:20px;
    font-size:500;
  }
}
.table-finantial{
  margin: 20px;
  float:right;
  flex:1;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 5px;
  background-color: #FFFFF0;
  p{
    margin-left:20px;
    font-size:500;
  }
}
</style>