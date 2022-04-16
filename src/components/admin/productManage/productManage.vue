<template>
  <!-- 用户管理界面 -->
  <div class="bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索头部input框 -->
    <div class="table">
      <el-card>
        <el-row>
          <el-col :span="15">
            <el-input
              placeholder="请输入商品名称关键词"
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
              >添加商品
            </el-button>
          </el-col>
        </el-row>
        <!-- 渲染数据表格 -->
        <el-table :data="userList" border style="width: 100%">
          <el-table-column type="index" width="70" :index="indexFn">
          </el-table-column>
          <!-- 所有的prop值必须要和数据库改成一样的 -->
          <el-table-column prop="id" label="编号" width="120">
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="120">
          </el-table-column>
          <el-table-column prop="description" label="商品描述" width="280">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="120">
          </el-table-column>
          <el-table-column prop="surplusNum" label="剩余数量" width="120">
          </el-table-column>
          <el-table-column prop="type" label="商品类型" width="100">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                @click="showActiity(scope.row)"
                >添加秒杀活动</el-button
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
      <!-- 添加商品dialog对话框 -->
      <el-dialog
        title="添加商品"
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
          <el-form-item label="编号" prop="id">
            <el-input v-model="addUserForm.id" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="addUserForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="description">
            <el-input v-model="addUserForm.description" clearable></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input-number v-model="addUserForm.price" :min="0" />
          </el-form-item>
          <el-form-item label="剩余数量" prop="surplusNum">
            <el-input-number v-model="addUserForm.surplusNum" :min="0" />
          </el-form-item>
          <el-form-item label="商品类型" prop="type">
            <el-input v-model="addUserForm.type" clearable></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer">
          <el-button type="primary" @click="addUser">确 定</el-button>
          <el-button @click="addUserVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 添加秒杀活动dialog对话框 -->
      <el-dialog
        title="添加秒杀活动"
        v-model="addActivityVisible"
        width="50%"
        @close="closeaddActivityDialog"
      >
        <el-form
          :model="addActivityForm"
          :rules="addActivityFormRul"
          ref="addActivityFormRef"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品数量" prop="productNum">
            <el-input-number v-model="addActivityForm.productNum" :min="0" />
          </el-form-item>
          <el-form-item label="开始时间" prop="beginTime">
            <el-date-picker
              v-model="addActivityForm.beginTime"
              type="datetime"
              placeholder="选择开始时间"
              value-format="YYYY-MM-DDThh:mm:ss"
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="addActivityForm.endTime"
              type="datetime"
              placeholder="选择结束时间"
              value-format="YYYY-MM-DDThh:mm:ss"
            />
          </el-form-item>
          <el-form-item label="可购买最大数量" prop="buyMaximum">
            <el-input-number v-model="addActivityForm.buyMaximum" :min="0" />
          </el-form-item>
          <el-form-item label="活动描述" prop="description">
            <el-input v-model="addActivityForm.description" clearable></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer">
          <el-button type="primary" @click="addActiity">确 定</el-button>
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
      keyword: '',
      sponsorId: '',
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
      addActivityVisible: false,
      //添加用户参数
      addUserForm: {
        id: '',
        name: '',
        description: '',
        price: 0,
        surplusNum: 0,
        type: '',
      },
      //添加秒杀活动参数
      addActivityForm: {
        sponsorId: '',
        productId: '',
        productNum: 0,
        beginTime: '',
        endTime: '',
        description: '',
        buyMaximum: 0,
      },
      //添加用户对话框验证规则
      addUserFormRul: {
        name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' },
        ],
      },
      killId: '',
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
          '/sponsor/getProductsInfo/name/' +
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
              temp.name = tempUserList[i].name
              temp.description = tempUserList[i].description
              temp.price = tempUserList[i].price
              temp.surplusNum = tempUserList[i].surplusNum
              temp.type = tempUserList[i].type
              that.userList.push(temp)
            }
            this.total = 100
          } else {
            that.$message.error('请求商品列表失败')
          }
        })
    },
    showActiity(row) {
      this.addActivityVisible = true
      this.addActivityForm.productId = row.id
    },
    //添加秒杀活动
    addActiity() {
      const that = this
      this.addActivityForm.beginTime = this.addActivityForm.beginTime + '.315Z'
      this.addActivityForm.endTime = this.addActivityForm.endTime + '.315Z'
      this.addActivityForm.sponsorId = this.sponsorId
      this.$http
        .post('/sponsor/addSecondKill', this.addActivityForm)
        .then((ress) => {
          console.log(ress)
          if (ress.status === 200) {
            if (ress.data.code === 200) {
              that.$message.success('添加成功')
              this.killId = ress.data.data.id
            } else {
              that.message.error(ress.data.message)
            }
          } else {
            that.$message.error('添加失败')
          }
        })
      this.$confirm('是否邀请符合条件的用户？', '邀请', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      })
        .then(() => {
          this.$http.post('/screen_result/invite', this.killId).then((ress) => {
            if (ress.status === 200) {
              that.$message.success('邀请成功')
            } else {
              that.$message.error('邀请失败')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消邀请',
          })
        })
      //关闭dialog对话框
      this.addActivityVisible = false
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
          this.$http
            .post('/sponsor/addProduct', this.addUserForm)
            .then((ress) => {
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
    closeaddActivityDialog() {
      //重置表单
      if (this.$refs.addActivityFormRef !== undefined) {
        this.$refs.addActivityFormRef.resetFields()
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
    window.sessionStorage.getItem('sponsorId')
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