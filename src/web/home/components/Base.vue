<template>
  <div id="content" class="warp">
    <div class="header">
      <div class="top">
        <span class="back">
          <img src="../images/arror.svg"> 返回
        </span>
        <span class="protocol">
          礼仪01
          <img src="../images/exit.svg">
        </span>
        <span class="mark" v-if="isHeadDemoShow.mark">
          <img src="../images/warning.svg"> 词条注释
        </span>
      </div>
      <div class="mid" v-if="isHeadDemoShow.logo">
        <logo></logo>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 主要内容  end -->

    <div class="footer">
      <ul class="tabs">
        <li v-for="info in footData">
          <router-link 
          :to="info.path"
          :class="info.icon">{{info.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import Logo from '@web/logo/Logo.vue'

@Component({
  components: {
    Logo
  }
})
export default class BaseCom extends Vue {
  @State(state => state.common.isHeadDemoShow) isHeadDemoShow: any
  footData: any = [
    {
      name: '搜索手机',
      path: '/search',
      icon: 'search'
    },
    {
      name: '新建访客',
      path: '/createUser',
      icon: 'create'
    },
    {
      name: '签到记录',
      path: '/signIn',
      icon: 'signIn'
    }
  ]
}
</script>

<style lang="scss" scoped>
.warp{
  min-height: 100vh;
  background: url('../images/bg.jpg') repeat left top;
  background-size: 100% auto;
}
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

.main{
  padding-bottom: 50px;
}

.footer{
  position: absolute;
  left:0;
  bottom:0;
  overflow: hidden;
  width:100%;
}
.tabs{
  background: #F6F6F7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  li{
    height: 49px;
    line-height: 49px;
    margin:0 45px;
    color:#333;
    font-size:12px;
    cursor: pointer;
    a{
      &::before{
        content: '';
        display: inline-block;
        height: 19px;
        width:17px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center center;
        margin-right:6px;
        margin-top:-3px;
        vertical-align: middle;
      }
      &.search::before{
        background-image: url('../images/sreach.svg');
      }
      &.create::before{
        background-image: url('../images/create.svg');
      }
      &.signIn::before{
        background-image: url('../images/sign.svg');
      }
    }
    .router-link-active{
      color:#D5001C;
      &.search::before{
        background-image: url('../images/sreach_active.svg');
      }
      &.create::before{
        background-image: url('../images/create_active.svg');
      }
      &.signIn::before{
        background-image: url('../images/sign_active.svg');
      }
    }
  }
}

</style>

