<template>
  <div class="search-phone">
    <div class="photo">
      <img src="../../images/photo.jpg">
    </div>

    <div class="title">
      {{title}}
    </div>
    <div class="phone">
      <label>手机号</label>
      <div class="info">
        <VInput 
        v-model="nameValue" 
        width="288px"
        height="35px"
        type="tel"
        placeholder="请输入完整的手机号或后四位"></VInput>

        <div class="error">请输入正确的手机号</div>
      </div>
    </div>

    <div class="btn-box">
     <v-button @click="submit">查找访客</v-button>
    </div>

    <alert v-model="isAlertShow">
      没有搜到相关访客，是否新建访客
      <template slot="footer">
          <v-button class="btn" width="105px" height="35px" :type="1" @click="close">否</v-button>
          <v-button class="btn" width="105px" height="35px" @click="close">是</v-button>
      </template>
    </alert>

  </div>
</template>

<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import VInput from '@src/ipad/components/form/VInput.vue'
import VButton from '@src/ipad/components/form/VButton.vue'
import Alert from '@src/ipad/components/dialog/Alert.vue'

@Component({
  components: {
    VInput,
    VButton,
    Alert
  }
})
export default class SearchPhone extends Vue {
  @Mutation('setHeadDemoShow') setHeadDemoShow: Function

  mounted () {
    this.setHeadDemoShow({
      mark: false,
      logo: false
    })
  }
  title: string = '7月活动'
  isAlertShow: boolean = false

  submit () {
    this.isAlertShow = true
  }
  close () {
    this.isAlertShow = false
  }
}
</script>

<style lang="scss" scoped>
.photo{
  width:100%;
  margin-bottom:37px;
  img{
    display: block;
    width:100%;
  }
}
.title{
  text-align: center;
  font-size:18px;
  color:#000;
  line-height: 30px;
  margin-bottom: 40px;
}
.phone{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: nowrap;
  padding-bottom: 55px;
  label{
    display: inline-block;
    margin-right: 25px;
    font-size: 14px;
    color:#333;
    line-height: 35px;
  }
  .info{
    position: relative;
    .error{
      position: absolute;
      top:35px;
      left:25px;
      line-height: 24px;
    }
  }
}
</style>

