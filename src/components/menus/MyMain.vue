<template>
  <!-- 标题 -->
  <h4 class="text-center">主页面</h4>

  <!-- 用户列表 -->
  <table class="table table-bordered table-striped table-hover">
    <thead>
      <!-- 商品秒杀列表展示数据：商品名称、商品价格、商品介绍、剩余数量、秒杀倒计时、秒杀 -->
      <tr>
        <th>#</th>
        <th>商品名称</th>
        <th>商品价格</th>
        <th>商品介绍</th>
        <th>剩余数量</th>
        <th>秒杀倒计时</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in userlist" :key="item.id">
        <td>{{ i + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.num }}</td>
        <td>{{ item.timecountdown }}</td>
        <td>
          <router-link :to="'/home/kill/' + item.id">秒杀！</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'MyMain',
  data() {
    return {
      // 用户列表数据
      userlist: [
        { id: 1, name: '手机', price: 10000, description: '苹果🍎', num: 100, timecountdown: '10h'},
        { id: 2, name: '手机', price: 10000, description: '苹果🍎', num: 100, timecountdown: '10h'},
        { id: 3, name: '手机', price: 10000, description: '苹果🍎', num: 100, timecountdown: '10h'},
        { id: 4, name: '手机', price: 10000, description: '苹果🍎', num: 100, timecountdown: '10h'},
      ],
    }
  },
}
</script>

<style lang="less" scoped></style>
