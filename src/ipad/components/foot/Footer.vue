<template>
    <div class="footer">
      <ul class="tabs">
        <li v-for="info in footData">
          <router-link 
          :to="info.path"
          :class="info.icon">{{info.name}}</router-link>
        </li>
      </ul>
    </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Tabs extends Vue {
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
        background-image: url('../../images/sreach.svg');
      }
      &.create::before{
        background-image: url('../../images/create.svg');
      }
      &.signIn::before{
        background-image: url('../../images/sign.svg');
      }
    }
    .router-link-active{
      color:#D5001C;
      &.search::before{
        background-image: url('../../images/sreach_active.svg');
      }
      &.create::before{
        background-image: url('../../images/create_active.svg');
      }
      &.signIn::before{
        background-image: url('../../images/sign_active.svg');
      }
    }
  }
}
</style>


