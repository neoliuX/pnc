<template>
  <div class="home">
    首页
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  font-size: 14px;
}

</style>


