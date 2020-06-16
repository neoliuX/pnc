<template>
  <ul class="pagination" v-if='pageSize > 1'>
    <li v-if="value != 1" class="pre-page">
      <a @click="previousPage"> 上一页 </a>
    </li>
    <li v-for="pageNo in pageList" :class="{'active':value == pageNo, 'ellipsis': pageNo == -1}">
      <a @click="goToPage(pageNo)">{{pageNo == -1 ? "..." : pageNo}}</a>
    </li>

    <li v-if="value != pageSize" class="next-page">
      <a @click="nextPage"> 下一页 </a>
    </li>
  </ul>
</template>

<script lang="ts" scoped>

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  @Prop() value: number // 当前页数 绑定model
  @Prop() pageSize: number // 总页数 必传
  @Prop() maxNum: number // 中间的几个页数的数量
  @Prop() reserveNum: number // 当前页数在中间时候 在第几位

  @Watch('pageSize') pageSizeChange () {
    this.doPaging()
  }

  // @Output("pageChanged") pageChanged = new EventEmitter();
  pageList: number[] = []
  minPage: number = 1
  isMaxPage: boolean = false // 当前页面是否在最后一排页面里

  mounted () {
    this.doPaging()
  }

  doPaging () {
    const maxNum = +this.maxNum || 5
    const reserveNum = +this.reserveNum || 1
    const isDisplayAll = this.pageSize - this.maxNum < 2
    const currentPage = +this.value
    const totalSize = +this.pageSize
    const isFirstGroup = maxNum - currentPage >= 1
    const isLastGroup = totalSize - currentPage <= maxNum - reserveNum - 1
    const firstNum = isFirstGroup ? 1 : isLastGroup ? totalSize - maxNum + 1 : currentPage - reserveNum
    const lastNum = isLastGroup ? totalSize : firstNum + maxNum - 1
    const isOneGroup = totalSize - maxNum < 2

    let pageList: number[] = []

    for (let i = firstNum; i <= lastNum; i++) {
      pageList.push(i)
    }

    if (!isOneGroup && !isFirstGroup) pageList = [1, -1].concat(pageList)
    if (!isOneGroup && !isLastGroup) pageList = pageList.concat([-1, totalSize])
    this.pageList = pageList
  }

  nextPage () {
    this.goToPage(this.value + 1)
  }
  previousPage () {
    this.goToPage(this.value - 1)
  }

  async goToPage (pageNo: number) {
    if (pageNo > this.pageSize || pageNo < 1 || pageNo === +this.value) return false

    this.$emit('input', pageNo)
    await Vue.nextTick()
    this.pageChageListner()
    this.doPaging()
  }

  pageChageListner () {
    this.$emit('pageChanged', this.value)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: nowrap;
  margin: 50px 0;
  li{
    height: 18px;
    line-height: 18px;
    margin:0 2px;
    a{
      display: block;
      min-width: 18px;
      cursor: pointer;
      color: #333333;
      font-size:14px;
      border-radius: 3px;
      overflow: hidden;
      text-align: center;
      &:hover{
        color:#D5001C;
      }
    }
    &.active {
      a {
        background: #D5001C;
        color: #fff;
      }
    }
  }
  .ellipsis {
    opacity: 0.4;
    a {
      cursor: default;
      &:hover {
        background-color: inherit;
        border-color: transparent;
      }
    }
  }
  .pre-page{
    margin-right: 15px;
  }
  .next-page {
    margin-left: 15px;
  }
}
</style>

