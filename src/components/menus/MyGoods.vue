<template>
  <h4 class="text-center">订单信息</h4>
  <!-- 对 待收货/确认收货/售后 四种不同类型的订单进行区分 -->
  <!-- 先放置4个小按钮 -->
  <div class="buttonteam">
      <button type="button" class="btn btn-light" style="marginRight:10px;background-color: #FFF5EE;" @click="onShowall">全部</button>
      <button type="button" class="btn btn-light" style="marginRight:10px;background-color: #F0F8FF" @click="onShowwait">待收货</button>
      <button type="button" class="btn btn-light" style="marginRight:10px;background-color: #FFE4E1" @click="onShowaccept">确认收货</button>
      <button type="button" class="btn btn-light" style="marginRight:10px;background-color: #E6E6FA" @click="onShowback">售后</button>
  </div>
  <table class="table table-bordered table-striped table-hover">
    <thead>
      <!-- 商品秒杀列表展示数据：商品名称、商品价格、商品介绍、剩余数量、秒杀倒计时、秒杀 -->
      <tr>
        <th>#</th>
        <th>商品描述</th>
        <th>商品购买数量</th>
        <th>商品价格</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="(item, i) in goodslist" :key="item.id">
        <td>{{ i + 1 }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.num }}</td>
        <td>{{ item.price }}</td>
       
      </tr>
    </tbody>
  </table>

</template>

<script>
export default {
  name: 'MyGoods',
  data() {
    return {
      goodslist: [
        { id: 1, description: 'string', num: '1', price: '111'},
      ],
    }
  },

  methods: {
    onShowall(){
      console.log("全部");
      
    },
    onShowwait(){
      console.log("待收货");
      // 进行遍历筛选出所有状态为待收货的商品
    },
    onShowaccept(){
      console.log("确认收货");
    },
    onShowback(){
      console.log("售后");
    }
  }
}
</script>

<style lang="less" scoped>
.buttonteam{
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
// >button{
//   margin-left: 10px;
// }
</style>