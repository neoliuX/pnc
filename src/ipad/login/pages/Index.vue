<template>
  <div class="login-main">
    <h3 class="title">活动访客管理工具</h3>
    <ul class="info">
      <li class="user">
        <img src="../images/user.svg" class="icon">
        <input type="text" v-model="userName" placeholder="用户名">
      </li>
      <li class="password">
        <img src="../images/password.svg" class="icon">
        <input type="password" v-model="password" placeholder="密码">
      </li>
    </ul>

    <div class="btn-box">
      <v-button class="btn" @click="submit">登 录</v-button>
    </div>

    <alert v-model="isAlertShow">
      用户名或密码错误！
      <template slot="footer">
          <v-button class="btn" width="105px" height="35px" @click="close">是</v-button>
      </template>
    </alert>
  </div>
</template>

<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
import VButton from '@src/ipad/components/form/VButton.vue'
import Alert from '@src/ipad/components/dialog/Alert.vue'
import { ReqApi } from '../lib/reqApi'

@Component({
  components: {
    VButton,
    Alert
  }
})
export default class IndexCom extends Vue {
  userName: string = ''
  password: string = ''
  isAlertShow: boolean = false
  errorMsg: any

  async submit () {
    this.errorMsg = this.checkValue()
    if(this.errorMsg) {
      this.isAlertShow = true
      return
    }
    const { data: { code, data } } = await this.$ajax.post('/api/v2/iam/password/_login', {
      userName: this.userName,
      password: this.password,
      tenantId: 'porsche'
    })
    if(code === 0) {
      window.location.href = '/search-user.html#/searchPhone'
    } else {
      this.isAlertShow = true
    }
  }

  /**
   *
   * 验证状态
   */
  checkValue (key?: string | undefined) {
    const regs = {
      userName: [this.userName, [this.$v.isUnBlank], '账号不能为空'],
      password: [this.password, [this.$v.isUnBlank, this.$v.minLength(6)], '密码不能小于6位']
    }
    return this.$v.check(key, regs, this)
  }

  close () {
    this.isAlertShow = false
  }
}
</script>

<style lang="scss" scoped>
  .login-main{
    height: 310px;
    width: 430px;
    background: rgba($color: #fff, $alpha: 0.25);
    margin:95px auto 0;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 28px 45px 0;
  }
  .title{
     text-align: center;
     color:#000000;
     font-size: 20px;
     line-height: 30px;
  }
  .info{
    margin-bottom:40px;
    li{
      position: relative;
      height: 64px;
      border-bottom:1px solid rgba($color: #9B9B9B, $alpha: 0.36);
      padding-left:34px;
      .icon{
        display: inline-block;
        width: 17px;
        position: absolute;
        left:3px;
        bottom:10px;
      }
      input{
        height: 34px;
        padding-top:30px;
        line-height: 34px;
        border:none;
        background: none;
        width:100%;
        font-size: 16px;
        color:#000;
        &::placeholder{
          color:#717175;
        }
      }
    }
  }
  .btn{
    margin:0 auto;
  }
</style>

