<template>
  <div class="head-demo">
    <div class="text">
      默认表格
    </div>
    <search-table>
    <table class="table">
      <thead>
        <tr class="table-head">
          <th>姓名</th>
          <th>称谓</th>
          <th>手机号码</th>
          <th>是否已领取礼品</th>
          <th>实际陪同人数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 3">
          <td>neo</td>
          <td>neo liu</td>
          <td>上海</td>
          <td>未领取</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>

    </search-table>
  </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
import SearchTable from '../SearchTable.vue'
@Component({
  components: {
    SearchTable
  }
})
export default class HeadDemo extends Vue {
  tabs: any = [
    {
      name: '已签到（43）',
      value: '1'
    },
    {
      name: '未签到（57）',
      value: '0'
    }
  ]
}
</script>

<style lang="scss" scoped>

</style>


