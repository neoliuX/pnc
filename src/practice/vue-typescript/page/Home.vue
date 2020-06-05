<template>
  <div class="home">
    home{{name}}
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  name: string = 'neo'

  testTs (num: number | string) {
    console.log(this.name, num)
  }

  mounted () {
    console.log('home')
    this.testTs(78)
    this.testTs('adada')
  }
}
</script>

<style lang="scss">
.vue-type{
  color:red;
}
</style>


