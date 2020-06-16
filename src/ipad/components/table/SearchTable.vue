<template>
  <div class="table-box" :class="">
    <slot></slot>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class SearchTable extends Vue {
  @Prop() tableType?: number// 不传为默认 1 不分场次 | 2 分场次
}
</script>

<style lang="scss" scoped>
.table-box{
  width:100%;
  table{
    width:100%;
    font-size: 14px;
    color:#333;
    text-align: center;
  }
  thead{
    background: #DCDCDC;
  }
  th{
    vertical-align: middle;
    height: 32px;
  }
  td{
    vertical-align: middle;
    height: 38px;
    border-bottom: 1px solid #EBEBEB;
  }
}
</style>

