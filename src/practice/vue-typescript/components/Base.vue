<template>
  <div class="vue-type">
    <ul>
      <li v-for="info in nav">
        <router-link :to="info.key">{{info.name}}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BaseCom extends Vue {
  nav: any = [
    {
      name: 'home',
      key: 'home'
    },
    {
      name: 'other',
      key: 'other'
    },
    {
      name: 'all',
      key: 'all'
    }
  ]
  mounted () {
    console.log('base')
  }
}
</script>

<style lang="scss">
.vue-type{
  color:red;
}
</style>

