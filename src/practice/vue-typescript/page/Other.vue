<template>
  <div class="other">
    other{{name}}
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Other extends Vue {
  name: string = 'other'

  testTs () {
    console.log(this.name)
  }

  mounted () {
    console.log('other')
  }
}
</script>

<style lang="scss">
.vue-type{
  color:red;
}
</style>


