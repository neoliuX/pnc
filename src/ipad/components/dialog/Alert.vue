<template>
  <transition name="fade">
    <div class="alert" v-if='value'>
      <div class="box">
        <header class="header">
          <slot name="header">提示</slot>
        </header>
        <div class="mid">
          <slot></slot>
        </div>
        <footer class="foot">
          <slot name="footer">
            <v-button class="btn" width="105px" height="35px" :type="1" @click="close('cancel')">取消</v-button>
            <v-button class="btn" width="105px" height="35px" @click="close('determine')">确定</v-button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>


<script lang="ts" scoped>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import VButton from '@src/ipad/components/form/VButton.vue'

@Component({
  components: {
    VButton
  }
})
export default class AlertCom extends Vue {
  @Prop() value?: boolean

  close (str: string) {
    this.$emit('input', false)
  }
}
</script>

<style lang="scss" scoped>
.alert{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  z-index: 999;
  background: rgba(0,0,0,0.5);
}
.box{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width:386px;
  min-height: 206px;
  background: #fff;
  text-align: center;
}
.header{
  line-height: 41px;
  color:#fff;
  font-size: 16px;
  text-align: center;
  background: #333;
}
.foot{
  display: flex;
  align-items: center;
  justify-content: center;
  /deep/ .btn{
    margin:0 20px;
    width: 105px;
    height: 35px;
    line-height: 35px;
  }
}
.mid{
  min-height: 103px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#000;
  font-size:16px;
  line-height: 22px;
}

</style>


