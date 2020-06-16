<template>
  <div class="sign-in">
      <router-view></router-view>
  </div>
</template>

<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'

@Component
export default class SearchBase extends Vue {
}
</script>

<style lang="scss" scoped>
</style>

