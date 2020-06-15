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
  // @Prop() prevText: string // 上一页的文字
  // @Prop() nextText: string // 下一页的文字

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
  user-select: none;
  font-size: 13px;
  display: inline-block;
  li {
    float: left;
    margin-right: 12px;
    a {
      display: inline-block;
      cursor: pointer;
      color: #888;
      border: 1px solid transparent;
      border-radius: 50%;
      min-width: 22px;
      height: 22px;
      line-height: 20px;
      // text-align: center;
      &:hover {
        transition-duration: 200ms;
        text-decoration: none;
        border: 1px solid #333;
      }
    }
  }
  .active {
    a {
      color: #ff7a00;
      text-indent: -2px;
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
  .next-page {
    .iconfont {
      transform: rotateY(180deg);
      display: inline-block;
    }
  }
}
</style>

