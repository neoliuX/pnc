<template>
    <div class="header">
      <div class="top">
        <span class="back" @click="goBack">
          <img src="../../images/back.svg"> 返回
        </span>
        <span class="protocol">
          礼仪01
          <img src="../../images/exit.svg">
        </span>
        <span class="mark" v-if="isHideMark ? false : true">
          <img src="../../images/warning.svg"> 词条注释
        </span>
      </div>
      <div class="mid" v-if="isHideLogo ? false : true">
        <logo></logo>
      </div>
    </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Logo from '@src/ipad/components/logo/Logo.vue'

@Component({
  components: {
    Logo
  }
})
export default class VTitle extends Vue {
  @Prop() isHideLogo? : string
  @Prop() isHideMark? : string
  goBack () {
    window.history.back()
  }
}
</script>

<style lang="scss" scoped>
.header{
  .top{
    height: 38px;
    line-height: 38px;
    overflow: hidden;
    padding:0 23px;
    span{
      float: right;
      display: flex;
      align-items: center;
      color:#333;
      img{
        margin-right: 8px;
      }
    }
    .back{
      float: left;
    }
    .protocol{
      margin-left: 30px;
      img{
        margin:0 0 0 8px;
      }
    }
  }
  .mid{
    padding-bottom: 35px;
  }
}

</style>


