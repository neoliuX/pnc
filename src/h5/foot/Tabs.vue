<template>
  <ul class="tabs">
    <li v-for="info in list" 
    @click="tab(info.value)">
      <icon class="icon" v-html="info.icon"></icon>
      {{info.name}}
    </li>
  </ul>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Icon from '@components/icon/Icon.vue'

@Component({
  components: {
    Icon
  }
})
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
  background: #F6F6F7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  li{
    height: 49px;
    line-height: 49px;
    margin:0 45px;
    color:#333;
    font-size:12px;
    cursor: pointer;
    .icon{
      font-size:17px;
      vertical-align: middle;
    }
  }
}
</style>


