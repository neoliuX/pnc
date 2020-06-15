<template>
  <div class="button" 
  :class="classObj" 
  @click="handleInput" @click.stop="$emit('click.stop', $event)">
     <slot></slot>
  </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class VButton extends Vue {
  @Prop() type?: 0 | 1 | 2// 0 默认红色 | 1 灰色 | 2 无填充色，红色边框
  get classObj () {
    let className = ''
    switch (this.type) {
    case 1:
      className = 'gary'
      break
    case 2:
      className = 'border-red'
      break
    default:
      className = 'default'
      break
    }
    return className
  }

  handleInput (event: any) {
    // const value = event.target.value
    this.$emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.button{
  display: inline-block;
  background:#D5001C;
  background: linear-gradient(#D5001C, #A50015);
  font-size: 16px;
  border-radius: 32px;
  text-align: center;
  color:#fff;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0, 0.16);
  width: 124px;
  line-height: 32px;
  height: 32px;
}
.gary{
  background:#333333;
  background: linear-gradient(#333333, #767676);
}
.border-red{
  border:1px solid #D5001C;
  height: 30px;
  width:122px;
  background:none;
  color:#D5001C;
}

</style>


