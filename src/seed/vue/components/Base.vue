<template>
  <div class="container">
    <div class="content">
      <p>
        <router-link to="/gcoin">Gcoin</router-link>
        <router-link to="/point">point</router-link>
      </p>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Base extends Vue {
  anyThing: string = 'any'
}
</script>
