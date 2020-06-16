<template>
  <div class="radios">
    <label v-for="info in radios" class="radio">
      {{info.name}}
    </label>
  </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Radio extends Vue {
  @Prop() radios: any
  @Prop() radio?: Object
}
</script>

<style lang="scss" scoped>
.radios{
  overflow: hidden;
}
.radio{
  float: left;
}
</style>


