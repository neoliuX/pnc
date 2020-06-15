<template>
    <VInput 
    v-model="value" 
    width="260px"
    :placeholder="placeholder"
    class="search">
      <template slot="icon">
        <icon class="icon">&#xe609;</icon>
      </template>
    </VInput> 
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Icon from '@components/icon/Icon.vue'
import VInput from './VInput.vue'
@Component({
  components: {
    VInput,
    Icon
  }
})
export default class SearchCom extends Vue {
  @Prop() width?: string
  @Prop() placeholder?: string

  get getWidth () {
    return this.width || '260px'
  }

  value: string = ''
  @Watch('value')
  onModelValue () {
    this.$emit('input', this.value)
  }
}
</script>

<style lang="scss" scoped>
.search{
  .icon{
    font-size:14px;
    position: absolute;
    left:15px;
    top:50%;
    transform: translateY(-50%);
    color:#B80017;
  }
  /deep/ input{
    padding-left: 35px;
  }
}
</style>


