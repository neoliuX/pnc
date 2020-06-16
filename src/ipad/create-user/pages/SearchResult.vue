<template>
  <div class="search-result">
    <search-table></search-table>

    <div class="pagination-box">
      <pagination
        pageSize="20"
        v-model="currentPage"></pagination>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { Vue, Component, Prop } from 'vue-property-decorator'
import SearchTable from '../components/SearchTable.vue'
import Pagination from '@src/ipad/components/foot/Pagination.vue'

@Component({
  components: {
    SearchTable,
    Pagination
  }
})
export default class SearchResult extends Vue {
  currentPage: number = 1

  onPageChange (numb: number) {
    console.log(numb)
  }

  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>

