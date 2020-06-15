<template>
  <div class="v-button-demo">
    <h1>loading框</h1>
        
    <v-button  @click='buttonClick'>点击弹出 3秒后隐藏</v-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VButton from '../../../form/VButton.vue'

@Component({ // 不需要引入spinner 只需要在最外层入口文件调用Vue.use()
  components: {
    VButton
  }
})
export default class SpinnerDemoComponent extends Vue {
  myValue: string[] = []

  buttonClick (value: string) {
    this.$spinner.show()
    setTimeout(() => {
      this.$spinner.hide()
    }, 3000)
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
