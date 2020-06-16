<template>
  <div class="v-select" :style="{width: getWidth}">
    <div class="title">{{option.name}}</div>
    <img class="icon" :src="getIcon === 1 ? require('../../images/arror.svg') : require('../../images/arrorBlack.svg')">
    <select v-model="option">
      <option 
      v-for="info in options" 
      :value="info">
      {{info.name}}
      </option>
    </select>
  </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component
export default class VSelect extends Vue {
  @Prop() width?: string
  @Prop() defalutOption: any
  @Prop() options: any
  @Prop() icon?: number// 1 灰色 /2 黑色
  get getWidth () {
    return this.width || '200px'
  }

  get getIcon () {
    return this.icon || 2
  }

  option: any = this.defalutOption

  @Watch('option')
  onModelOption () {
    this.$emit('input', this.option)
  }
}
</script>

<style lang="scss" scoped>
.v-select{
  width: 146px;
  height: 25px;
  line-height: 25px;
  border-radius: 30px;
  border:1px solid rgba(217,217,217, 0.79);
  position: relative;
  color:#333;
  box-sizing: border-box;
  font-size: 14px;
  padding:0 20px;
  select{
    opacity: 0;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    z-index: 5;
  }
  .icon{
    position: absolute;
    top:50%;
    right:20px;
    transform: translateY(-50%);
    z-index: 3;
    width: 8px;
  }
}
</style>


