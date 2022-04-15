<template>
		<!-- signin end -->
		<section class="signin popup-in">
			<div class="container">
				<div class="row">
					<div class="col-sm-12">
						<div class="single-sign">
							<div class="sign-content popup-in-content">
								<div class="popup-in-txt">
									<h2>sign in</h2>

									<div class="signin-form">
										<div class=" ">
											<div class=" ">
												<form action="signin.html">
													<div class="form-group">
													    <label for="userName">邮箱</label>
													    <input type="text" class="form-control" v-model.trim="email" id="email" placeholder="">
													</div><!--/.form-group -->
													<div class="form-group">
														<label for="signin_form">密码</label>
													    <input type="password" class="form-control" v-model.trim="password" id="password" placeholder="">
													</div><!--/.form-group -->
												</form><!--/form -->
											</div><!--/.col -->
										</div><!--/.row -->

									</div><!--/.signin-form -->

									<div class="signin-footer">
										<button type="button" class="btn signin_btn" @click="onLoginClick">
										sign in
										</button>
										<p>
											Don’t have an Account ?
											 <a @click="onLogup">register</a>
										</p>
									</div><!--/.signin-footer -->
								</div><!--/.popup-in-txt -->
							</div><!--/.sign-content -->
						</div><!--/.single-sign -->
					</div><!--/.col -->
				</div><!--/.row-->
			</div><!--/.container -->
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
  name: 'MyLogin',
  data() {
    return {
      email: '',
      password: '',
      id: '',
    }
  },
  methods: {
    // 方法1 没有使用qs会失败。。
    async post() {
      await this.$http.post('/user/login',
      { email: '123@123.com', password: '123' },
      { headers: {'Content-Type': 'application/json'}}).then((res) => {console.log(res)}).catch( ( error ) => {
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

    // 方法2 使用qs
    // 注意重新安装完qs之后需要重新启动项目
    onLoginClick(){
      var url = "http://106.52.2.132:8888/user/login";
      var data = {email: this.email , password: this.password}
      var that = this
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

// address: "WHU"
// age: 18
// deposit: 50994516
// email: "0mtjsaiidm@yahoo.com"
// gender: "男"
// id: "0022415C4E3645FD95AD1372F4F159CE"
// idCardNumber: "F26B1683061544009E"
// name: "丁苑"
// nickName: "藵粳劐鑱棳"
// password: "7792F84B"
// phoneNumber: "13806755759"
// profession: "学生"
// riskDegree: 20
// uncredit: "YES"
                    // 添加localData
                    if(localStorage.getItem('localData')){
                      localStorage.removeItem('localData')
                    }
                    var str_jsonData = JSON.stringify(res.data.data)
                    //通过localStorage保存到本地中,命名为localData
                    localStorage.setItem('localData', str_jsonData);
                    localStorage.setItem('token', 'Bearer xxx')
                    // localStorage.setItem('token',JSON.stringify(user))
                    // localStorage.setItem('token', res.data.data.address )
                    that.onHome();
                   }
            })
    },

    // 注册
    onLogup(){
      console.log("logup...");
        this.$router.push('/logup')
    },

    onHome(){
      console.log("to home...");
      this.$router.push('/home')
      // localStorage.setItem('token', 'Bearer xxx')
    }
    // onLoginClick() {
    //   console.log("click");
    //   console.log(this.userName);
    //   if (this.email === 'admin' && this.password === '123456') {
    //     this.$router.push('/home')
    //     localStorage.setItem('token', 'Bearer xxx')
    //   } else {
    //     localStorage.removeItem('token')
    //   }
    // },

  },

}
</script>

<style scoped>
body{
  background: url(../../assets/images/log-in.png) repeat-x; 
  background-size: 100%;
  background-repeat: repeat-y;
}

</style>