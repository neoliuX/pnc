<template>
  <div class="v-input" :style="{width: getWidth}">
      <slot name="icon"></slot>
      <slot></slot>
      <input v-model="value" :type="getType" :placeholder="placeholder">
  </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class VInput extends Vue {
  @Prop() type?: string
  @Prop() placeholder?: string
  @Prop() width?: string
  @Prop() defaultTxt?: string

  get getWidth () {
    return this.width || '146px'
  }

  get getType () {
    return this.type || 'text'
  }

  value: string = ''
  @Watch('value')
  onModelValue () {
    if(this.type === 'date' && this.value !== '') this.value = this.value.split('-').join('/')
    this.$emit('input', this.value)
  }

  @Watch('defaultTxt')
  onModelDefaultTxt () {
    this.value = this.defaultTxt ? this.defaultTxt : ''
  }
}
</script>

<style lang="scss" scoped>
.v-input{
  width: 146px;
  height: 25px;
  line-height: 25px;
  border-radius: 30px;
  border:1px solid rgba(217,217,217, 0.79);
  position: relative;
  color:#333;
  box-sizing: border-box;
  font-size: 14px;
  input{
    background: none;
    display: block;
    border:none;
    height: 100%;
    outline:none;
    width:100%;
    box-sizing: border-box;
    padding:5px 20px;
    -webkit-tap-highlight-color : rgba(0,0,0,0);
  }
}
</style>


