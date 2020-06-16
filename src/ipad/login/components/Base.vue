<template>
  <div id="content" class="login">
    <div class="logo">
      <logo-com></logo-com>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
import LogoCom from '@src/ipad/components/logo/Logo.vue'

@Component({
  components: {
    LogoCom
  }
})
export default class BaseCom extends Vue {
}
</script>

<style lang="scss" scoped>
.login{
  min-height: 100%;
  background:url('../images/loginBg.jpg') no-repeat left bottom;
  background-size: 100% auto;
}
.logo{
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 96px;
}
</style>

