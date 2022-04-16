<template>
  <!-- 用户管理界面 -->
  <div class="bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>秒杀活动</el-breadcrumb-item>
      <el-breadcrumb-item>秒杀活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索头部input框 -->
    <div class="table">
      <el-card>
        <!-- <el-row>
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
            <el-button type="primary" @click="search">搜索</el-button
            >
          </el-col>
        </el-row> -->
        <!-- 渲染数据表格 -->
        <el-table :data="userList" border style="width: 100%">
          <el-table-column type="index" width="70" :index="indexFn">
          </el-table-column>
          <!-- 所有的prop值必须要和数据库改成一样的 -->
          <el-table-column prop="id" label="编号" width="230">
          </el-table-column>
          <el-table-column prop="productId" label="商品编号" width="100">
          </el-table-column>
          <el-table-column prop="productNum" label="商品总数" width="120">
          </el-table-column>
          <el-table-column prop="surplusNum" label="剩余数量" width="120">
          </el-table-column>
          <el-table-column prop="beginTime" label="开始时间" width="120">
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="120">
          </el-table-column>
          <el-table-column prop="buyMaximum" label="最大购买数量" width="75">
          </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column prop="ruleId" label="规则编号" width="200">
          </el-table-column>
          <el-table-column prop="sponsorId" label="发起人id" width="150">
          </el-table-column>
          <el-table-column prop="state" label="活动状态" width="150">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                @click="showDetail(scope.row)"
                >点击查看商品详情</el-button
              >
            </template>
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
      <!-- 商品详情展示 -->
      <el-dialog v-model="dialogVisible" title="商品详情">
        <el-form :model="form">
          <el-form-item label="商品id" label-width="100px">
            <p>{{ id }}</p>
          </el-form-item>
          <el-form-item label="商品名称" label-width="100px">
            <p>{{ name }}</p>
          </el-form-item>
          <el-form-item label="商品描述" label-width="100px">
            <p>{{ desciption }}</p>
          </el-form-item>
          <el-form-item label="商品价格" label-width="100px">
            <p>{{ price }}</p>
          </el-form-item>
          <el-form-item label="剩余数量" label-width="100px">
            <p>{{ surplusNum }}</p>
          </el-form-item>
          <el-form-item label="商品类型" label-width="100px">
            <p>{{ type }}</p>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
          </span>
        </template>
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
      id: '',
      name: '',
      description: '',
      price: 0,
      surplusNum: 0,
      type: '',
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
          '/sponsor/universalKillSelect/id/' +
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
              temp.id = tempUserList[i].id
              temp.beginTime = tempUserList[i].beginTime
              temp.buyMaximum = tempUserList[i].buyMaximum
              temp.description = tempUserList[i].description
              temp.endTime = tempUserList[i].endTime
              temp.productId = tempUserList[i].productId
              temp.productNum = tempUserList[i].productNum
              temp.ruleId = tempUserList[i].ruleId
              temp.sponsorId = tempUserList[i].sponsorId
              temp.state = tempUserList[i].state
              temp.surplusNum = tempUserList[i].surplusNum
              that.userList.push(temp)
            }
            this.total = 100
          } else {
            that.$message.error('请求活动列表失败')
          }
        })
    },
    //点击显示商品详情
    showDetail(row) {
      const that = this
      this.$http.get('/sponsor/getKillDetails/' + row.id).then((ress) => {
        console.log(ress)
        if (ress.status === 200) {
          this.id = ress.data.data.productInformation.id
          this.name = ress.data.data.productInformation.name
          this.description = ress.data.data.productInformation.description
          this.price = ress.data.data.productInformation.price
          this.surplusNum = ress.data.data.productInformation.surplusNum
          this.type = ress.data.data.productInformation.type
          this.dialogVisible = true
        } else {
          that.$message.error('请求活动列表失败')
        }
      })
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

.el-form p {
  margin-left: 100px;
}
</style>