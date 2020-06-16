<template>
  <ul class="tabs">
    <li v-for="info in list" 
    @click="tab(info.value)"
    :class="info.value === nowKey ? 'active' : ''">
      {{info.name}}
    </li>
  </ul>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Tabs extends Vue {
  @Prop() list: any
  @Prop() default?: string// 默认选择tab
  nowKey: string = ''
  tab (str: string) {
    this.nowKey = str
  }
  mounted () {
    this.nowKey = this.default ? this.default : this.list[0]['value']
  }
}
</script>

<style lang="scss" scoped>
.tabs{
  overflow: hidden;
  li{
    width: 50%;
    float: left;
    background:#333333;
    color:#fff;
    font-size: 14px;
    line-height: 29px;
    text-align: center;
    cursor: pointer;
    &.active{
      background: #D5001C;
    }
  }
}
</style>


