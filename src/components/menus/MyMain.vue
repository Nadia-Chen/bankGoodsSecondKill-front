<template>
  <!-- 标题 -->
  <h4 class="text-center">主页面</h4>

  <!-- 用户列表 -->
  <table class="table table-bordered table-striped table-hover">
    <thead>
      <!-- 商品秒杀列表展示数据：商品名称、商品价格、商品介绍、剩余数量、秒杀倒计时、秒杀 -->
      <tr>
        <th>#</th>
        <th>商品描述</th>
        <th>商品剩余数量</th>
        <th>商品状态</th>
        <th>秒杀开始时间</th>
        <th>秒杀结束时间</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in goodslist" :key="item.id">
        <td>{{ i + 1 }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.surplusNum }}</td>
        <td>{{ item.state }}</td>
        <td>{{ item.start }}</td>
        <td>{{ item.end }}</td>
        <td>
          <router-link :to="'/home/kill/' + item.id">
            <button type="button" class="btn btn-info" style="width: 100px">详情</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="this.goodslist === null">
    暂无商品
  </div>
</template>

<script>
export default {
  name: 'MyMain',
  data() {
    return {
      // 商品列表默认数据
      goodslist: [
        { id: 1, description: 'null', surplusNum: 'null', state: 'null', start: 'null', end: 'null'},
        { id: 2, description: '手机', surplusNum: '10000', state: '未开始', start: '2022-05-01', end: '2022-06-01'},
        { id: 3, description: '电脑', surplusNum: '10000', state: '未开始', start: '2022-06-01', end: '2022-07-01'},
        { id: 4, description: '耳机', surplusNum: '9999', state: '未开始', start: '2022-07-01', end: '2022-08-01'},
      ],
      // 从localstorage里获取
      userId: '',
    }
  },
  created(){
    this.getGoodsList()

  },
  methods: {
    //获取商品列表数据的方法
    async getGoodsList(){
      console.log("获取商品列表数据……");
      //读取本地的字符串数据
      var getLocalData = localStorage.getItem('localData');
      //将字符串类转换为json格式
      var jsonObj = JSON.parse(getLocalData);
      //从jsonObj中提取我们想要的数据
      console.log(jsonObj.id);
      // 赋值给userId
      this.userId = jsonObj.id;

      // console.log('/kill_information/getAvailableKill/'+this.userId+'/1/1000');
      // 获取商品列表
      const { data: res } = await this.$http.get('/kill_information/getAvailableKill/'+this.userId+'/0/1000').catch( ( error ) => {
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
      // console.log(res);
      console.log(res.data[0]);
      // console.log(res.data.length);
      // console.log(this.goodslist.length);
      // 赋值给goodslist
      for (var i=0;i<res.data.length;i++)
      { 
          var starttime = res.data[i].beginTime.substring(0,19);
          starttime = starttime.replace('T',' ')
          var endtime = res.data[i].endTime.substring(0,19);
          endtime = endtime.replace('T',' ')
          this.goodslist[i].start = starttime;
          this.goodslist[i].end = endtime;
          
          this.goodslist[i].description = res.data[i].description;
          this.goodslist[i].surplusNum = res.data[i].surplusNum;
          this.goodslist[i].state = res.data[i].state;

      }
      console.log(this.goodslist);

      // 将商品信息存储到localstorage
      // 添加localData
      if(localStorage.getItem('localGoods')){
        localStorage.removeItem('localGoods')
      }
      var str_jsonData = JSON.stringify(res.data)
      //通过localStorage保存到本地中,命名为localGoods
      localStorage.setItem('localGoods', str_jsonData);

    },

    getKillDetaiils(){
      // 获取秒杀商品细节

    },
  }
}
</script>

<style lang="less" scoped></style>
