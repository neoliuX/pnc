<template>
  <div class="v-title">
    <slot></slot>
  </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class VTitle extends Vue {
}
</script>

<style lang="scss" scoped>
.v-title{
  height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: 20px;
  color: #fff;
  background: url('./images/titleBg.svg') no-repeat;
  background-size: cover;
  text-align: center;
}
</style>


