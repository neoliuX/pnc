<template>
    <VInput 
    v-model="value" 
    type="date"
    :placeholder="placeholder"
    :default-txt="value"
    class="date">
      <span>{{value}}</span>
      <template slot="icon">
        <img src="./images/date.svg" class="icon">
      </template>
    </VInput> 
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import VInput from './VInput.vue'
@Component({
  components: {
    VInput
  }
})

export default class DateInput extends Vue {
  @Prop() type?: string
  @Prop() placeholder?: string

  value: string = ''
  @Watch('value')
  onModelValue () {
    this.$emit('input', this.value)
  }

  mounted () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    this.value = `${year}/${month > 9 ? month : '0' + month}/${day > 9 ? day : '0' + day}`
  }
}
</script>

<style lang="scss" scoped>
.date {
  text-align: left;
  font-size:14px;
  color: #333;
  padding-left:20px;
  /deep/ input{
    position: absolute;
    width:100%;
    height: 100%;
    top: 0;
    left:0;
    z-index: 5;
    opacity: 0;
  }
  .icon{
    position: absolute;
    top:50%;
    right:20px;
    transform: translateY(-50%);
  }
}
</style>


