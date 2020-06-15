<template>
  <div class="v-button-demo">
    <h1>警告框</h1>
        
    <v-button  @click='buttonClick'>正确提示框</v-button>
    <v-button  @click='buttonClick2'>叹号提示框, 并带提示</v-button>
    <v-button  @click='buttonClick3'>警告提示框</v-button>
    <v-button  @click='buttonClick4'>错误提示框</v-button>

    <p style="margin-top: 20px"> </p>
        
    <v-button  @click='buttonClick5'>正确确认框</v-button>
    <v-button  @click='buttonClick6'>叹号确认框, 并带提示</v-button>
    <v-button  @click='buttonClick7'>警告确认框</v-button>
    <v-button  @click='buttonClick8'>错误确认框</v-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VButton from '../../../form/VButton.vue'

@Component({ // 不需要引入alert 只需要在最外层入口文件调用Vue.use()
  components: {
    VButton
  }
})
export default class SpinnerDemoComponent extends Vue {
  mounted () {
  }

  buttonClick () {
    this.$alert.success('Success alert')
  }
  buttonClick2 () {
    this.$alert.info('Success alert', '我是提示，其余的几种方法也可以加这种提示，是可选的')
  }
  buttonClick3 () {
    this.$alert.warning('Success alert')
  }
  buttonClick4 () {
    this.$alert.error('xxx错误')
  }

  buttonClick5 () {
    this.$confirm.success('Success confirm', '', () => { console.log('按ok了') }, () => { console.log('关闭了') })
  }
  buttonClick6 () {
    this.$confirm.info('Success confirm', '我是提示，其余的几种方法也可以加这种提示，是可选的', () => { console.log('按ok了') }, () => { console.log('关闭了') })
  }
  buttonClick7 () {
    this.$confirm.warning('Success confirm', 'confirm 是有回调的，第一个函数是确认回调，第二个是关闭回调', () => { console.log('按ok了') }, () => { console.log('关闭了') })
  }
  buttonClick8 () {
    this.$confirm.error('xxx错误', '', () => { console.log('按ok了') }, () => { console.log('关闭了') })
  }
}
</script>

<style lang="scss">
.my-class-name {
  
}
.v-button-demo {
  margin-top: 30px;
}
</style>
