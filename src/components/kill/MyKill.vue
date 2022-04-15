<template>
  <!-- <h4 class="text-center">商品详情页面 --- {{id}}</h4> -->
  <!-- 分成两个part 1商品简介 2支付确认 -->
  <div class="goodsinf">
    <button type="button" class="btn btn-light btn-sm" @click="goBack">后退</button>
  
    <h3 class="text-center">商品信息</h3>
    <p style="color:black; margin-left:30px">商品名称：{{itemname}}</p>
    <p style="color:black; margin-left:30px">商品价格：{{price}}</p>
    <p style="color:black; margin-left:30px">商品介绍：{{description}}</p>
    <p style="color:black; margin-left:30px">最大购买数量：{{buyMaximum}}</p>
    <p style="color:black; margin-left:30px">商品剩余数量：{{surplusNum}}</p>
    <p style="color:black; margin-left:30px">秒杀开始时间：{{beginTime}}</p>
    <p style="color:black; margin-left:30px">秒杀结束时间：{{endTime}}</p>
    <p style="color:black; margin-left:30px">秒杀活动状态：{{state}}</p>
  </div>

    <div class="sponsorinf">
      <h3 class="text-center">发起人信息</h3>
      <p style="color:black; margin-left:30px">发起人编号：{{sponsorID}}</p>
      <p style="color:black; margin-left:30px">发起人名称：{{sponsorName}}</p>
      <p style="color:black; margin-left:30px">发起人描述：{{sponsorDescription}}</p>
    </div>

  <div>
    <div class="button">
      <button type="button" class="btn btn-info" style="width: 100px" @click="onPayClick" >立即下单</button>
    </div>
    <div v-if="warning">
      <p style="color:red; text-align: center;">{{message}}</p>
    </div>
  </div>

<!-- 点击下单 弹出悬浮窗口确认支付 -->
<div v-if="pay">
  <hr>
  <h3 class="text-center">支付确认</h3>
  <div class="userinf">
    <p style="color:black; margin-left:30px">收货人：{{name}}</p>
    <p style="color:black; margin-left:30px">银行卡号：{{idCardNumber}}</p>
    <p style="color:black; margin-left:30px">联系方式：{{phoneNumber}}</p> 
    <p style="color:black; margin-left:30px">收货地址：{{address}}</p>
    <p style="color:black; margin-left:30px">
      <div class="counter-container">
        购买数量：
        <!-- 数量 -1 按钮 -->
        <button type="button" class="btn btn-light btn-sm" @click="onSubClick">-</button>
        <!-- 输入框 -->
        <input type="text" class="form-control form-control-sm ipt-num" style="width: 60px" v-model.number.lazy="buyAmount"/>
        <!-- 数量 +1 按钮 -->
        <button type="button" class="btn btn-light btn-sm" @click="onAddClick">+</button>
      </div>
    </p>
    
    <div class="buttonpay">
      <button type="button" class="btn btn-info" style="width: 100px; margin:39px 20px 20px;" @click="payComfirm">确认支付</button>
    </div>
      <div v-if="result">
        <p style="color:red; text-align: center;">{{resultmessage}}</p>
      </div>
    
  </div>
</div>
  <hr>
<vue-basic-alert 
    		   :duration="300" 
    		   :closeIn="1800" 
    		   ref="alert" />
</template>

<script>
import qs from 'qs'
import VueBasicAlert from 'vue-basic-alert'

export default {
  name: 'MyKill',
  props: ['id'], // this.id
  components:{
		VueBasicAlert,
	},
  data(){
    return{
      name: '',
      address: '',
      idCardNumber: '',
      phoneNumber: '',

      itemname: '',
      price: '',
      description: '',
      surplusNum: '',
      endTime: '',
      beginTime:'',
      buyAmount: 1,
      buyMaximum: '',
      state: '',

      sponsorID: '1',
      sponsorName: 'admin',
      sponsorDescription: '无',

      userID: '',
      killID: '',

      flag: 0,
      pay:false,
      warning:false,
      result:false,
      message:'',
      resultmessage:'',
      randomUrl: '',
    }
  },
  created(){
    try {
      this.getInformation();
    this.getGoodsInformation();
    this.getSponsorInformation();
    } catch (error) {
      
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 更改商品购买数量
    onSubClick(){
      if( this.buyAmount-1 == 0 ) return;
      this.buyAmount--
    },
    onAddClick(){
      if( this.buyAmount+1 > this.buyMaximum ) return;
      this.buyAmount++
    },

    // 获取用户信息
    getInformation(){
      console.log("获取用户信息数据……");
      //读取本地的字符串数据
      var getLocalData = localStorage.getItem('localData');
      //将字符串类转换为json格式
      var jsonObj = JSON.parse(getLocalData);
      //从jsonObj中提取我们想要的数据
      console.log(jsonObj.id);
      // 赋值
      this.name = jsonObj.name;
      this.address = jsonObj.address;
      this.idCardNumber = jsonObj.idCardNumber;
      this.phoneNumber = jsonObj.phoneNumber;
      this.userID = jsonObj.id;
    },

    // 获取商品信息
    getGoodsInformation(){
      console.log("获取商品信息数据……");
      //读取本地的字符串数据
      var getLocalData = localStorage.getItem('localGoods');
      //将字符串类转换为json格式
      var jsonObj = JSON.parse(getLocalData);
      //从jsonObj中提取我们想要的数据
      // console.log(jsonObj[0].id);
      this.killID = jsonObj[this.id-1].id;
      this.buyMaximum = jsonObj[this.id-1].buyMaximum;
      this.description = jsonObj[this.id-1].description;
      this.surplusNum = jsonObj[this.id-1].surplusNum;
      this.state = jsonObj[this.id-1].state;

      var end =  jsonObj[this.id-1].endTime.substring(0,19);
      end = end.replace('T',' ');
      this.endTime = end;
      var begin =  jsonObj[this.id-1].beginTime.substring(0,19);
      begin = begin.replace('T',' ');
      this.beginTime = begin;
    },

    // 获取发起人信息
    async getSponsorInformation(){
      // /sponsor/getKillDetails/{killId}
      console.log("获取发起人信息");
      const { data: res } = await this.$http.get('/sponsor/getKillDetails/'+ this.killID )
      console.log(res.data);
      console.log(res.data.productInformation.name);
      if(res.data.productInformation == null){
        return;
      }
      else{
        try {
          this.price = res.data.productInformation.price
          this.itemname = res.data.productInformation.name
        } catch (error) {
          console.log(error);
        }
      }
      
      if(res.data.sponsor == null){
        return;
      }
      else{
        try {
          this.sponsorID = res.data.sponsor.id
          this.sponsorName = res.data.sponsor.name
          this.sponsorDescription = res.data.sponsor.description
          
        } catch (error) {
          console.log(error);
        }
      }
    },

    // 立即下单
     async onPayClick(){
      
      // 调用接口传参
      console.log('/kill_information/getRandomUrlWithoutAOP/'+this.userID+'/' + this.killID);
      const { data: res } = await this.$http.get('/kill_information/getRandomUrlWithoutAOP/'+this.userID+'/' + this.killID )
      // console.log(res);
      // 返回res.data是一串字符串
      if(res.data == null) {
        this.warning = true;
        this.message = res.message
        this.$refs.alert.showAlert(
  			          'error', // There are 4 types of alert: success, info, warning, error
  			          "请重新登录", // Size of the icon (px)
  			          '下单失败', // Icon styles: now only 2 styles 'solid' and 'regular'
  			          'Success 200', // Header of the alert
  			          this.message // Message of the alert
  			      );
      }
      else{
        try {
          this.pay = true;
          if(this.flag == 0){
            this.$refs.alert.showAlert(
  			          'success', // There are 4 types of alert: success, info, warning, error
  			          "", // Size of the icon (px)
  			          '下单成功', // Icon styles: now only 2 styles 'solid' and 'regular'
  			          'Success 200', // Header of the alert
  			          '' // Message of the alert
  			      );
            this.flag = 1;
          }
          else{
              this.$refs.alert.showAlert(
  			          'warning', // There are 4 types of alert: success, info, warning, error
  			          "", // Size of the icon (px)
  			          '重复请求', // Icon styles: now only 2 styles 'solid' and 'regular'
  			          'Success 200', // Header of the alert
  			          '' // Message of the alert
  			      );
          }
          
          this.randomUrl = res.data;
          // console.log('/kill_information/users/'+ this.userID +'/kills/'+ this.killID +'/products/' + this.buyAmount + '/'+ this.randomUrl);
          const { data: get } = await this.$http.get('/kill_information/users/'+ this.userID +'/kills/'+ this.killID +'/products/' + this.buyAmount + '/'+ this.randomUrl )
          // console.log(get);
          if(get.code == 6666) return;
          else{
            // this.warning = true;
            this.message = get.message;
            }
          } catch (error) {
            console.log(error);
        }
      }
    },

    // 确认支付后扣除存款
    payComfirm(){
      console.log("确认支付");
      // 支付成功
      this.$refs.alert.showAlert(
  		      'success', // There are 4 types of alert: success, info, warning, error
  		      "", // Size of the icon (px)
  		      '支付成功', // Icon styles: now only 2 styles 'solid' and 'regular'
  		      'Success 200', // Header of the alert
  		      "" // Message of the alert
  		  );
      // post
      var url = "http://106.52.2.132:8888/order_information/pay/"+ this.userID + "/" + this.killID;
      var data = {email: this.email , password: this.password}
      // var that = this
      this.$http({
              url,
              data: qs.stringify(data),
              method: 'post',
              headers: {
                   'Content-Type':'application/x-www-form-urlencoded'
              }
              }).then(res => {
                   console.log(res)
                  //  console.log(res.data.message);
                   console.log(res.status);
                  //  成功登陆
                   if(res.status === 200){
                    console.log(res.data.data.address);
                    console.log(res.data.data);
                    // 绑定id值
                    this.id = res.data.data.id;
                  }
            })
            
    },
  }
}
</script>

<style lang="less" scoped>
.goodsinf{
  margin: 20px;
  margin-top: 0;
  float:left;
  width:50%;
  .p{
    color: black;
  }
}
.sponsorinf{
  // float: right;
  // margin-left: 40%;
    margin-left: 0px;
    margin-top: 50px;
}
.userinf{
  margin: 20px;
  .p{
    color: red;
  }
}
.button{
  text-align: center;
  margin: 20px;
  margin-top: 140px;
  // padding: 20px;
}
.buttonpay{
text-align: center;
}
.counter-container {
display: flex;
// 按钮的样式
.btn {
width: 25px;
 }
// 输入框的样式
.ipt-num {
width: 34px;
text-align: center;
margin: 0 4px;
 }
}
</style>