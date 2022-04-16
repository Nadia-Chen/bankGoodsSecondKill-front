<template>
  <!-- 用户管理界面 -->
  <div class="bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>用户</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索头部input框 -->
    <div class="table">
      <el-card>
        <el-row>
          <el-col :span="15">
            <el-input
              placeholder="请输入用户名关键词"
              v-model="keyword"
              class="input-with-select"
              clearable
              @clear="getUserList"
            >
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="search">搜索</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="add" @click="addUserVisible = true"
              >添加用户
            </el-button>
          </el-col>
        </el-row>
        <!-- 渲染数据表格 -->
        <el-table :data="userList" border style="width: 100%">
          <el-table-column type="index" width="70" :index="indexFn">
          </el-table-column>
          <!-- 所有的prop值必须要和数据库改成一样的 -->
          <el-table-column prop="id" label="编号" width="200">
          </el-table-column>
          <el-table-column prop="name" label="实名" width="80">
          </el-table-column>
          <el-table-column prop="nickName" label="昵称" width="120">
          </el-table-column>
          <el-table-column prop="password" label="密码" width="120">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="60">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="100">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="75">
          </el-table-column>
          <el-table-column prop="deposit" label="存款"> </el-table-column>
          <el-table-column prop="idCardNumber" label="卡号" width="200">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="150">
          </el-table-column>
          <el-table-column prop="phoneNumber" label="电话" width="150">
          </el-table-column>
          <el-table-column prop="profession" label="职称" width="150">
          </el-table-column>
          <el-table-column prop="riskDegree" label="风险度" width="100">
          </el-table-column>
          <el-table-column prop="uncredit" label="是否可信" width="100">
          </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:current-page="queryInfo.pageIndex"
          :page-sizes="[5, 6, 7, 8, 9, 10]"
          v-model:page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
      <!-- 添加用户dialog对话框 -->
      <el-dialog
        title="添加用户"
        v-model="addUserVisible"
        width="50%"
        @close="closeaddUserDialog"
      >
        <el-form
          :model="addUserForm"
          :rules="addUserFormRul"
          ref="addUserFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="实名" prop="name">
            <el-input v-model="addUserForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="addUserForm.nickName" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="addUserForm.password"
              type="password"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="addUserForm.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="addUserForm.address" clearable></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input-number v-model="addUserForm.age" :min="1" />
          </el-form-item>
          <el-form-item label="存款金额" prop="deposit">
            <el-input v-model="addUserForm.deposit" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email" clearable></el-input>
          </el-form-item>
          <el-form-item label="ID" prop="id">
            <el-input v-model="addUserForm.id" clearable></el-input>
          </el-form-item>
          <el-form-item label="卡号" prop="idCardNumber">
            <el-input v-model="addUserForm.idCardNumber" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phoneNumber">
            <el-input v-model="addUserForm.phoneNumber" clearable></el-input>
          </el-form-item>
          <el-form-item label="职称" prop="profession">
            <el-input v-model="addUserForm.profession" clearable></el-input>
          </el-form-item>
          <el-form-item label="风险度" prop="riskDegree">
            <el-input v-model="addUserForm.riskDegree" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否可信" prop="uncredit">
            <el-input v-model="addUserForm.uncredit" clearable></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer">
          <el-button type="primary" @click="addUser">确 定</el-button>
          <el-button @click="addUserVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadUrl: '/back/upload',
      keyword: '',
      // 请求用户列表的参数
      queryInfo: {
        userName: '',
        pageIndex: 1,
        pageSize: 10,
      },
      //用户列表数据
      userList: [],
      total: 0,
      // 添加用户dialog显示/隐藏
      addUserVisible: false,
      //添加用户参数
      addUserForm: {
        name: '',
        nickName: '',
        password: '',
        gender: '男',
        address: '',
        age: 0,
        deposit: 0,
        email: '',
        id: '',
        idCardNumber: '',
        phoneNumber: '',
        profession: '',
        riskDegree: 0,
        uncredit: '',
      },
      //添加用户对话框验证规则
      addUserFormRul: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
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
      },
      dialogVisible: false,
    }
  },
  methods: {
    //请求用户列表数据
    getUserList() {
      const that = this
      let key = ''
      if (this.keyword == '') {
        key = '*'
      } else {
        key = this.keyword
      }
      this.$http
        .get(
          '/sponsor/getUserList/name/' +
            key +
            '/id/asc/' +
            (this.queryInfo.pageIndex - 1) * this.queryInfo.pageSize +
            '/' +
            this.queryInfo.pageSize
        )
        .then((ress) => {
          console.log(ress)
          if (ress.status === 200) {
            that.userList = []
            const tempUserList = ress.data.data
            let temp = {}
            for (let i = 0; i < tempUserList.length; i++) {
              temp = {}
              temp.address = tempUserList[i].address
              temp.age = tempUserList[i].age
              temp.deposit = tempUserList[i].deposit
              temp.email = tempUserList[i].email
              temp.gender = tempUserList[i].gender
              temp.id = tempUserList[i].id
              temp.idCardNumber = tempUserList[i].idCardNumber
              temp.name = tempUserList[i].name
              temp.nickName = tempUserList[i].nickName
              temp.password = tempUserList[i].password
              temp.phoneNumber = tempUserList[i].phoneNumber
              temp.profession = tempUserList[i].profession
              temp.riskDegree = tempUserList[i].riskDegree
              temp.uncredit = tempUserList[i].uncredit
              that.userList.push(temp)
            }
          } else {
            that.$message.error('请求用户列表失败')
          }
        })
      this.$http.get('/amount').then((ress) => {
        console.log(ress)
      })
    },
    //搜索
    search() {
      this.queryInfo.pageIndex = 1
      this.getUserList()
    },
    //当前页面数据条数发生改变的时候触发
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
      this.getUserList()
    },
    //当前页码发生改变的时候触发
    handleCurrentChange(val) {
      this.queryInfo.pageIndex = val
      this.getUserList()
    },
    //添加用户
    addUser() {
      this.$refs.addUserFormRef.validate((valid) => {
        const that = this
        if (valid) {
          this.$http.post('/sponsor/addUser', this.addUserForm).then((ress) => {
            if (ress.status === 200) {
              that.$message.success('添加成功')
            } else {
              that.$message.error('添加失败')
            }
            //关闭dialog对话框
            this.addUserVisible = false
            this.getUserList()
          })
        }
      })
    },
    //正则限制输入字符
    btKeyDown(e) {
      e.target.value = e.target.value.replace(
        /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,
        ''
      )
    },
    //限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ''
      )
    },
    //关闭对话框事件
    closeaddUserDialog() {
      //重置表单
      if (this.$refs.addUserFormRef !== undefined) {
        this.$refs.addUserFormRef.resetFields()
      }
    },
    // 表格编号
    indexFn(index) {
      index =
        index + 1 + (this.queryInfo.pageIndex - 1) * this.queryInfo.pageSize
      return index
    },
  },
  created() {
    this.getUserList()
  },
}
</script>

<style>
.bread {
  margin: 10px 0 0 20px;
}

.table {
  margin: 15px 20px 0 0;
}

.add {
  background-color: rgba(2, 153, 208, 1);
  border: 1px solid rgba(149, 200, 229, 1);
}

.el-row {
  margin-bottom: 20px;
}

.el-table td,
.el-table th {
  text-align: center;
}

.el-pagination {
  margin-top: 20px;
}

.avatar-uploader .el-upload {
  border: 2px solid rgba(220, 223, 230, 1);
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  top: 0px;
  left: 170px;
}

.avatar-uploader .el-upload:hover {
  border-color: rgba(220, 223, 230, 1);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: rgba(220, 223, 230, 1);
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}

.userAddImg {
  width: 130px;
  height: 130px;
  display: block;
}

.userEditAatar {
  width: 130px;
  height: 130px;
  display: block;
}
</style>