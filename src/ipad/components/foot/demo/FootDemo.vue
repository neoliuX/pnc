<template>
  <div class="foot-demo">

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
import Pagination from '../Pagination.vue'

@Component({
  components: {
    Pagination
  }
})
export default class FootDemo extends Vue {
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


