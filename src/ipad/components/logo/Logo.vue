<template>
  <div class="logo">
    <img src="../../images/logo.png" >
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Logo extends Vue {
}
</script>

<style lang="scss" scoped>
 .logo{
   img{
     display: block;
     width:110px;
     margin:0 auto;
   }
 }
</style>


