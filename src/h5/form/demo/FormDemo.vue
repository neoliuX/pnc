<template>
  <div class="button-demo">
    <VButton>默认</VButton>  
    <br>
    <br>

    <VButton :type="1">灰色</VButton>
    <br>
    <br>

    <VButton :type="2">边框</VButton>
    <br>
    <br>

    <p class="text">选择日期： {{dateValue}}</p>

    <date-input 
    v-model="dateValue" 
    placeholder="请选择日期"></date-input>

    <br>
    <br>

    <p class="text">文本框： {{nameValue}}</p>
    <VInput 
    v-model="nameValue" 
    width="260px"
    placeholder="请输入客户的姓名"></VInput>
    <br>
    <br>

    <p class="text">搜索框： {{searchValue}}</p>
    <search-input 
    v-model="searchValue" 
    width="260px"
    placeholder="请输入完整手机号或者后四位"></search-input>

    <p class="text">下拉框： {{option}}</p>
    <v-select 
    :options="options"
    :defalutOption="option"
    v-model="option"></v-select>

  </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
import VButton from '../VButton.vue'
import VInput from '../VInput.vue'
import SearchInput from '../SearchInput.vue'
import DateInput from '../DateInput.vue'
import VSelect from '../VSelect.vue'
@Component({
  components: {
    VButton,
    VInput,
    SearchInput,
    DateInput,
    VSelect
  }
})
export default class FormDemo extends Vue {
  dateValue: string = ''
  searchValue: string = ''
  nameValue: string = ''

  options: any = [
    {
      name: '所有站点',
      value: 'all'
    },
    {
      name: '上海站点',
      value: 'sh'
    },
    {
      name: '北京站点',
      value: 'bj'
    }
  ]

  option: any = this.options[0]
}
</script>

<style lang="scss" scoped>

</style>


