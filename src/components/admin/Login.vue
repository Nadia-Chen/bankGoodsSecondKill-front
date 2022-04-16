<template>
  <div class="back">
    <div class="mengban">
      <div class="center">
        <div class="left">
          <div class="slogan">银行秒杀<br>系统后台</div>
        </div>
        <div class="right">
          <div class="login_title">管理员登录</div>

          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="" prop="account">
              <el-input
                v-model="ruleForm.account"
                class="username"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                class="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>

            <!-- <Vcode :show="isShow" @success="success" @close="close" /> -->
            <el-form-item>
              <el-button
                class="login"
                type="primary"
                @click="submitForm(ruleFormRef)"
                >登&nbsp;&nbsp;&nbsp;录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { getCurrentInstance } from 'vue'
import qs from 'qs'
import {useRouter} from 'vue-router'

//实例化路由
const router = useRouter()

const instance = getCurrentInstance()
const _this= instance.appContext.config.globalProperties

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  account: '',
  password: '',
})
const rules = reactive({
  account: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    {
      min: 2,
      max: 10,
      message: '长度在 2 到 10 个字符',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      min: 6,
      max: 16,
      message: '长度在 6 到 16 个字符',
      trigger: 'blur',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      var url = 'http://106.52.2.132:8888/sponsor/login'
      var data = {name: ruleForm.account, password: ruleForm.password}
      let that = _this
      _this.$http({
        url,
        data:qs.stringify(data),
        method:'post',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      })
        .then(ress => {
          console.log(ress)
          if (ress.status === 200) {
            window.sessionStorage.setItem('adminLogin', 'true')
            window.sessionStorage.setItem('sponsorId', ress.data.data.id)
            //跳转到首页
            router.push({
              path:'adminHome'
            })
          } else if (ress.status === 400) {
            that.$message.error('用户名或密码错误！')
          }else{
            that.$message.error('登陆失败')
          }
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// export default {
//   name: 'Login',
//   data() {
//     return {
//       ruleForm: {
//         //初始化
//         account: '',
//         password: '',
//       },
//     }
//   },
//   components: {
//     Vcode,
//     ElForm,
//     ElButton,
//     ElFormItem,
//     ElInput,
//   },
//   methods: {
//     submitForm() {
//       console.log('开始验证')
// this.$refs.ruleForm.validate((valid) => {
//   if (valid) {
//     let { account, password } = this.ruleForm
//     const that = this
//     this.$http
//       .post('http://106.52.2.132:8888/sponsor/login', {
//         name: account,
//         password: password,
//       })
//       .then((ress) => {
//         if (ress.data.code === 200) {
//           window.sessionStorage.setItem('adminLogin', 'true')
//           window.sessionStorage.setItem('adminId', ress.data.data.id)
//           this.$router.push('/adminHome') //跳转到首页
//         } else if (ress.data.code === 400) {
//           that.$message.error('用户名或密码错误！')
//         }
//       })
//   }
// })
//     },
//   },
//   mounted() {
//     window.sessionStorage.clear()
//   },
// }
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html.body {
  margin: 0;
  height: 100%;
}

.back {
  height: 100%;
  width: 100%;
  background-image: url('../../assets/login/海洋.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: top;
  position: fixed;
}

.mengban {
  height: 100%;
  width: 100%;
  background-color: rgba(3, 97, 132, 0.3);
}

.center {
  float: left;
  width: 1059px;
  height: 585px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
}

.left {
  float: left;
  width: 58%;
  height: 100%;
  background-color: rgba(2, 153, 208, 0.91);
  border-radius: 50px 0 0 50px;
  position: relative;
  overflow: hidden;
}

.left .slogan {
  width: 350px;
  height: 96px;
  position: absolute;
  margin: 200px 100px 0 auto;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  color: #fff;
  font-size: 55px;
  font-weight: 700;
  text-align: left;
}

.right {
  float: left;
  width: 340px;
  margin-left: -50px;
}

.username .el-input__inner {
  background: url('../../assets/login/账号.png') no-repeat 10px center;
  padding: 0px 50px;
  width: 340px;
  height: 51px;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid;
}

.password .el-input__inner {
  background: url('../../assets/login/密码.png') no-repeat 10px center;
  padding: 0px 50px;
  width: 340px;
  height: 60px;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid;
}

.el-form-item__label {
  width: 0;
}

.el-form-item__error {
  color: red;
  font-size: 18px;
  padding-top: 10px;
}

.login {
  width: 340px;
  height: 45px;
  background-color: rgba(2, 153, 208, 1);
  font-size: 22px;
  border-radius: 3px;
  margin-top: 50px;
}

.login_title {
  width: 130px;
  margin: 103px 160px 50px 210px;
  color: rgba(2, 153, 208, 1);
  font-size: 24px;
}

.el-button {
  color: #fff;
  border: none;
}
</style>