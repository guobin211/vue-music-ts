<template>
    <div class="RankPage">RankPage</div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import { getTopList, TopItem } from '@/api/rank-service'
  import { RESPONSE } from '@/api/config'

  @Component({
    name: 'RankPage'
  })
  export default class RankPage extends Vue {
    topList: TopItem[] = []

    created() {
      this._fetchTopList()
    }

    private _fetchTopList() {
      getTopList().then(res => {
        if (res.code === RESPONSE.ERROR_OK) {
          this.topList = res.data.topList;
        }
      })
    }
  }
</script>

<style>
</style>
