<template>
  <div id="content" class="warp">     
     <router-view></router-view>
  </div>
</template>

<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BaseCom extends Vue {
}
</script>

<style lang="scss" scoped>
</style>

