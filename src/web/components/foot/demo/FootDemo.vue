<template>
  <div class="foot-demo">
    <div class="text">
      底部导航
      <Tabs 
      :list="tabsData"
      :dafalut="tab"></Tabs>
    </div>


    <h1>分页</h1>
    <p style="margin-bottom: 20px">最小传入值 当前页数：{{currentPage}}</p>
    <pagination
      pageSize="20"
      v-model="currentPage"></pagination>
    <p style="margin-bottom: 20px">共显示多少页码，返回的事件</p>
    <pagination
      pageSize="7"
      maxNum="5"
      @input='onPageChange'
      v-model="currentPage2"></pagination>
    <p style="margin-bottom: 20px">text形式的分页</p>
    <pagination
      pageSize="7"
      maxNum="5"
      @input='onPageChange'
      v-model="currentPage3"></pagination>
      
  </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
import Tabs from '../Tabs.vue'
import Pagination from '../Pagination.vue'

@Component({
  components: {
    Tabs,
    Pagination
  }
})
export default class FootDemo extends Vue {
  tabsData: any = [
    {
      name: '搜索手机',
      value: '1',
      icon: '&#xe609;'
    },
    {
      name: '新建访客',
      value: '2',
      icon: '&#xe60a;'
    },
    {
      name: '签到记录',
      value: '3',
      icon: '&#xe604;'
    }
  ]
  tab: any = this.tabsData[0]

  currentPage: number = 1
  currentPage2: number = 5
  currentPage3: number = 5

  onPageChange (numb: number) {
    console.log(numb)
  }
}
</script>

<style lang="scss" scoped>
</style>


