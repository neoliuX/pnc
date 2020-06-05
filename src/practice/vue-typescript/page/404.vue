<template>
  <div class="rooer">
    404
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Other extends Vue {
  mounted () {
    console.log(404)
  }
}
</script>

<style lang="scss">
.vue-type{
  color:red;
}
</style>


