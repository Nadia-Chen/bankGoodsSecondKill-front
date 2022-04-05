<template>
  	<section class="signin signup">
			<div class="container-fluid">
				<div class="row">

					<div class="col-sm-4">
						<div class="single-sign">
							<div class="sign-bg">
								
							</div><!--/.sign-bg -->
						</div><!--/.single-sign -->
					</div><!--/.col -->

					<div class="col-sm-8">
						<div class="single-sign">
							<div class="sign-content">
								<h2>sign up</h2>

								<div class="signin-form">
									<form action="signin.html">
										<div class="row">
											<div class="col-sm-6">
												<div class="form-group">
												    <label for="signin_form">姓名</label>
												    <input type="text" class="form-control" id="name" placeholder="">
												</div><!--/.form-group -->
											</div><!--/.col -->
											<div class="col-sm-6">
												<div class="form-group xtra-margin-left">
												    <label for="signin_form">昵称</label>
												    <input type="text" class="form-control" id="nickName" placeholder="">
												</div><!--/.form-group -->
											</div><!--/.col -->
										</div><!--/.row -->

                    <div class="row">
											<div class="col-sm-6">
												<div class="form-group">
												    <label for="signin_form">性别</label>
												    <input type="text" class="form-control" id="gender" placeholder="">
												</div><!--/.form-group -->
											</div><!--/.col -->
											<div class="col-sm-6">
												<div class="form-group xtra-margin-left">
												    <label for="signin_form">年龄</label>
												    <input type="text" class="form-control" id="age" placeholder="">
												</div><!--/.form-group -->
											</div><!--/.col -->
										</div><!--/.row -->

										<div class="form-group">
										    <label for="signin_form">电话</label>
										    <input type="email" class="form-control" id="phoneNumber" placeholder="">
										</div><!--/.form-group -->
                    <div class="form-group">
										    <label for="signin_form">邮箱</label>
										    <input type="email" class="form-control" id="email" placeholder="">
										</div><!--/.form-group -->
										<div class="form-group">
										    <label for="signin_form">地址</label>
										    <input type="email" class="form-control" id="address" placeholder="">
										</div><!--/.form-group -->
                    <div class="form-group">
										    <label for="signin_form">卡号</label>
										    <input type="email" class="form-control" id="idCardNumber" placeholder="">
										</div><!--/.form-group -->
                    <div class="form-group">
										    <label for="signin_form">存款</label>
										    <input type="email" class="form-control" id="deposit" placeholder="">
										</div><!--/.form-group -->

										<div class="form-group">
											<label for="signin_form">密码</label>
										    <input type="password" class="form-control" id="password" placeholder="">
										</div><!--/.form-group -->

									  <div class="row">
											<div class="col-sm-6">
												<div class="form-group">
												    <label for="signin_form">验证码</label>
												    <input type="text" class="form-control" id="checkCode" placeholder="">
												</div><!--/.form-group -->
											</div><!--/.col -->
											<div class="col-sm-6">
												<div class="form-group xtra-margin-left">
                          <label for="signin_form">点击获取验证码</label>
												    <button type="button" class="form-control" @click="onCheckCodeClick">获取验证码</button>
												</div><!--/.form-group -->
											</div><!--/.col -->
										</div><!--/.row -->
                    
									</form><!--/form -->
								</div><!--/.signin-form -->
								<div class="signin-footer">
									<button type="button" class="btn signin_btn" data-toggle="modal" data-target=".signin_modal" @click="onLogupClick">
										sign up
									</button>
									<p>
										Already a Member ? <a @click="onLogin">signin</a>
									</p>
								</div><!--/.signin-footer -->

							</div><!--/.sign-content -->
            	</div><!--/.modal-content -->
								</div><!--/.modal-dialog -->

							</div><!--/.modal -->
							<!-- modal part end -->

						</div><!--/.single-sign -->
					
		</section><!--/.signin -->
		
		<!-- signin end -->

		
</template>

<script>
import '../assets/css/animate.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/bootsnav.css'
import '../assets/css/style.css'
import '../assets/css/responsive.css'

import '../assets/js/jquery.js'
import '../assets/js/bootstrap.min.js'
import '../assets/js/bootsnav.js'
import '../assets/js/jquery.sticky.js'
import '../assets/js/custom.js'

import qs from 'qs'

export default {
  name:'MyLogup',
  data(){
    return{
      address: '',
      age: '',
      checkCode: '',
      deposit: '',
      email: '',
      gender: '',
      idCardNumber: '',
      name: '',
      nickName: '',
      password: '',
      phoneNumber: '',
    }
  },
  methods: {
    // 登陆
    onLogin(){
      console.log("login...");
      this.$router.push('/login')
    },
    // 点击获取验证码
    onCheckCodeClick(){
      console.log("验证码");
      this.$http.post('/mails/poll-codes',
      { 
        account: this.address, 
        email: this.email,
      },
        {headers: {'Content-Type': 'application/json'}}).then((res) => {console.log(res)})
    
    },
    onLogupClick() {
      var url = "http://106.52.2.132:8888/user/register";
      var data = { 
        address: this.address, 
        age: this.age, 
        checkCode: this.checkCode,
        deposit: this.deposit,
        email: this.email,
        gender: this.gender,
        idCardNumber: this.idCardNumber,
        name: this.name,
        nickName: this.nickName,
        password: this.password,
        phoneNumber: this.phoneNumber,
      }
      this.$http({
              url,
              data: qs.stringify(data),
              method: 'post',
              headers: {
                   'Content-Type':'application/x-www-form-urlencoded'
              }
              }).then(res => {
                   console.log(res)
      }).catch( ( error ) => {
            // 【务必注意】这里的error输出的不是一个对象【error.response才是一个对象】
            console.log(error);
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log( error.response.data );
                console.log( error.response.status );
                console.log( error.response.headers );
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log( "Error", error.message );
            }
            console.log( error.config );
        } );
    },
  }
}
</script>

<style>

</style>