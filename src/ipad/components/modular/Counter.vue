<template>
  <div class="counter">
    <span  @click="decrease" class="sub">-</span>
    <input type="text" :value="currentNum" @blur="onInputBlur" class="nub" />
    <span  @click="increase" class="add">+</span>
  </div>
</template>
<script lang="ts" scoped>import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Counter extends Vue {
  @Prop () value: number
  
  decrease () {

  }
  increase () {

  }
  
  onInputBlur (event: any) {
    this.currentNum = event.target.value
  }
}
</script>

<style lang="scss" scoped>
.counter {
  user-select: none;
  display: inline-block;
}
.sub, .add {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 22px;
  text-align: center;
  border: 1px solid #434343;
  color: #f9f9f9;
  cursor: pointer;
  transition-duration: 200ms;
  border-radius: 2px;
  &:hover {
    border: 1px solid #fa7700;
    background: #fa7700;
    color: #fff;
  }
  &:active {
    position: relative;
    top: 1px;
  }
}
.add {
}
.nub {
  display: inline-block;
  padding: 5px;
  text-align: center;
  background: none;
  border: none;
  color: inherit;
  outline: none;
  width: 30px;
  color: #f9f9f9;
}

.disabled {
  background: #333;
  border: 1px solid #333;
  cursor: default;
  color: #666;
  &:active {
    top: 0px;
  }
  &:hover {
    background: #333;
    border: 1px solid #333;
    color: #666;
  }
}
</style>

