<template>
  <transition name="fade">
    <div class="modals" v-if='value'>
      <slot></slot>
    </div>
  </transition>
</template>


<script lang="ts" scoped>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class AlertCom extends Vue {
  @Prop() value?: boolean
}
</script>

<style lang="scss" scoped>
.modals{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  z-index: 999;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>


