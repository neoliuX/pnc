<template>
  <div id="content" class="warp">
    <header-com
    :is-hide-logo="hideLogo"
    :is-hide-mark="hideMark"></header-com>
    <!-- 主要内容 -->
    创建
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 主要内容  end -->

  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import HeaderCom from '@src/ipad/components/head/Header.vue'

@Component({
  components: {
    HeaderCom
  }
})
export default class BaseCom extends Vue {
  hideLogo: string = ''
  hideMark: string = ''

  mounted () {
    this.setHeadDemo()
  }
  setHeadDemo () {
    let path = this.$route.path
    this.hideLogo = this.hideMark = path.indexOf('searchPhone') === -1 ? '' : 'hide'
  }

  @Watch('$route')
  noModelRoute () {
    this.setHeadDemo()
  }
}
</script>

<style lang="scss" scoped>
.warp{
  min-height: 100vh;
  background: url('../../images/bg.jpg') repeat left top;
  background-size: 100% auto;
}
.main{
  padding-bottom: 50px;
}


</style>

