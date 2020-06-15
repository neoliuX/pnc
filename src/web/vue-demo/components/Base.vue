<template>
  <div class="warp">
    <ul class="leftbar">
      <li 
        v-for="info in list"
        :class="sort === info.path ? 'active':''">
        <router-link :to="info.path">{{info.name}}</router-link>
      </li>
    </ul>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BaseCom extends Vue {
  mounted () {
    this.sort = this.list[0]['path']
  }

  sort: string = ''

  list: any = [
    {
      'name': '表单类',
      'path': 'form'
    },
    {
      'name': '对话框',
      'path': 'dialog'
    },
    {
      'name': '头部相关',
      'path': 'head'
    },
    {
      'name': '底部模块',
      'path': 'foot'
    }
  ]
}
</script>

<style lang="scss" scoped>
.leftbar{
  position: fixed;
  top:0;
  left:0;
  height: 100%;
  width:180px;
  background: #000;
  color: #fff;
  overflow: hidden;
  overflow-y:auto;
  z-index: 9999;
  li{
    border-bottom: 1px solid rgba(255,255,255, 0.3);
    &:last-child{
      border:none
    }
    font-size: 12px;
    line-height: 30px;
    cursor: pointer;
    &:hover{
      background: rgba(255,255,255, 0.1);
    }
    a{
      color: #fff;
      display: block;
      padding:0 15px;
    }
    .router-link-exact-active{
      background: rgba(255,255,255, 0.15);
    }
  }
}
.main{
  margin-left:180px;
  padding: 20px;
}
</style>

