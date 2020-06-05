<template>
  <div class="vue">
    <header>header {{ test }}</header>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      test: 'test'
    }
  },
  mounted() {
    console.log('base')
  }
}
</script>

<style>
.vue{
  /* background:#000; */
}
</style>
