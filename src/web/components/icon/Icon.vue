<template>
  <i class="iconfont">
    <slot></slot>
  </i>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Icon extends Vue {

}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 1881803 */
  src: url('//at.alicdn.com/t/font_1881803_vcxqxkkrdmc.eot');
  src: url('//at.alicdn.com/t/font_1881803_vcxqxkkrdmc.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1881803_vcxqxkkrdmc.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1881803_vcxqxkkrdmc.woff') format('woff'),
  url('//at.alicdn.com/t/font_1881803_vcxqxkkrdmc.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1881803_vcxqxkkrdmc.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-style: normal;
    font-size:12px;
}

</style>


