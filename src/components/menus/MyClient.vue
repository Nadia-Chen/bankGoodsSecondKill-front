<template>
  <h4 class="text-center">用户信息</h4>
  <!-- 获取并展示用户的全部信息 -->
  <!-- name id_card_number age nickname gender phone_number email address deposit -->
  <div class="wrapper">
    <div class="table-basic">
      <p style="text-align: center; font-weight: 700; font-size: larger; margin: 10px 10px; color: black">基础信息</p>
      <p style="color: black;  margin-top: 1rem;">姓名: {{name}}</p>
      <p style="color: black">昵称:{{nickName}}</p>
      <p style="color: black">性别:{{gender}}</p>
      <p style="color: black">电话号码:{{phoneNumber}}</p>
      <p style="color: black">邮箱:{{email}}</p>
      <p style="color: black">住址:{{address}}</p>
    </div>
    <div class="table-finantial">
      <p style="text-align: center; font-weight: 700; font-size: larger; color: black;">账户信息</p>
      <p style="margin-top: 1rem; color: black;">卡号:{{idCardNumber}}</p>
      <p style="color: black;">存款金额:{{deposit}}元</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyClient',
    data(){
    return{
      name: '',
      nickName: '',
      gender:'',
      email: '',
      address: '',
      idCardNumber: '',
      phoneNumber: '',
      deposit:'',

    }
  },
  created(){
    this.getGoodsList()
  },
  methods:{
    async getGoodsList(){
      console.log("获取用户列表数据……");
      //读取本地的字符串数据
      var getLocalData = localStorage.getItem('localData');
      //将字符串类转换为json格式
      var jsonObj = JSON.parse(getLocalData);
      //从jsonObj中提取我们想要的数据
      console.log(jsonObj.id);
      // 赋值给userId
      // this.userId = jsonObj.id;
      this.name = jsonObj.name;
      this.address = jsonObj.address;
      this.idCardNumber = jsonObj.idCardNumber;
      this.phoneNumber = jsonObj.phoneNumber;
      this.nickName = jsonObj.nickName;
      this.gender = jsonObj.gender;
      this.email = jsonObj.email;
      this.deposit = jsonObj.deposit;
    }
  }
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
  padding: 10px;
  padding-bottom: 20px;
  background-color: #d6f5ff;
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
  padding: 10px;
  padding-bottom: 20px;
  background-color: #e7fbfb;
  p{
    margin-left:20px;
    font-size:500;
  }
}
</style>