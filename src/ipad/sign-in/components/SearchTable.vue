<template>
  <div class="table-box">
    <table class="table">
      <thead>
        <tr class="table-head">
          <th>姓名</th>
          <th>称谓</th>
          <th>手机号码</th>
          <th>保时捷中心</th>
          <th>签到类型</th>
          <th>是否已领取礼品</th>
          <th>实际陪同人数</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 10">
          <td>{{data[0].name}}</td>
          <td>{{data[0].nickname}}</td>
          <td>{{data[0].phone}}</td>
          <td>{{data[0].address}}</td>
          <td>{{data[0].signStyle}}</td>
          <td>{{data[0].gift}}</td>
          <td>{{data[0].people}}</td>
          <td>{{data[0].people}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class SearchTable extends Vue {
  @Prop() list?: any
  data: any = [
    {
      name: 'neo',
      nickname: 'neo neo',
      phone: '19181716161',
      address: '上海',
      signStyle: '签到类型',
      gift: '已领取',
      people: '2',
      opreate: '1'
    }
  ]
}
</script>

<style lang="scss" scoped>

</style>

