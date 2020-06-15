<template>
  <div class="head-demo">
    <p class="text">标题 </p>
    <VTitle>
      标题
    </VTitle>
    <br>
    <br>
    <p class="text">tabs </p>
    <Tabs :list="tabs"></Tabs>
  </div>
</template>


<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
import VTitle from '../VTitle.vue'
import Tabs from '../Tabs.vue'
@Component({
  components: {
    VTitle,
    Tabs
  }
})
export default class HeadDemo extends Vue {
  tabs: any = [
    {
      name: '已签到（43）',
      value: '1'
    },
    {
      name: '未签到（57）',
      value: '0'
    }
  ]
}
</script>

<style lang="scss" scoped>

</style>


