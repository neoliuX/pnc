<template>
  <div class="dialog">

    <p class="text">显示alert框, 默认标题 <VButton @click="isAlertDefault = true">显示alert框</VButton></p>
    
    <alert-com v-model="isAlertDefault">
      默认弹框
    </alert-com>

    <p class="text">显示alert框, 自定义标题 <VButton @click="isAlertShow = true">显示alert框</VButton></p>
  
    <alert-com v-model="isAlertShow">
      <template slot="header">标题</template>
      自定义标题， 自定义按钮弹框
      <template slot="footer">
          <v-button class="btn" width="105px" height="35px" :type="1" @click="close">是</v-button>
          <v-button class="btn" width="105px" height="35px" @click="close">否</v-button>
      </template>
    </alert-com>

    <p class="text">显示alert框, 自定义按钮 <VButton @click="isAlertBtn = true">显示alert框</VButton></p>
  
    <alert-com v-model="isAlertBtn">
      自定义按钮
      <template slot="footer">
          <v-button class="btn" width="105px" height="35px" :type="1" @click="close">是</v-button>
      </template>
    </alert-com>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import VButton from '@components/form/VButton.vue'
import AlertCom from '../Alert.vue'

@Component({
  components: {
    AlertCom,
    VButton
  }
})
export default class DialogDemo extends Vue {
  isAlertShow: boolean = false
  isAlertDefault: boolean = false
  isAlertBtn: boolean = false

  close () {
    this.isAlertDefault = false
    this.isAlertShow = false
    this.isAlertBtn = false
  }
}
</script>

<style lang="scss" scoped>
</style>


