<template>
  <div class="SingerPage" ref="singerRef">
    <MListView :data-list="singers" @select="selectSinger" ref="listRef"></MListView>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MListView from '@/components/m-list-view/MListView.vue'
import { getSingerList, Singer, SingerGroup } from '@/api/singer-service'
import { RESPONSE } from '@/api/config'
import { Getter, Mutation } from 'vuex-class'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

@Component({
  name: 'SingerPage',
  components: {MListView}
})
export default class SingerPage extends Vue {
  @Getter('singer') singer?: Singer
  @Mutation SET_SINGER!: (s: Singer) => void;
  singers: SingerGroup[] = []

  created() {
    this._fetchSingerList()
  }

  selectSinger(singer: Singer) {
    this.$router.push({
      path: `/singer/${singer.id}`
    })
    this.SET_SINGER(singer)
  }

  private _fetchSingerList() {
    getSingerList().then(res => {
      if (res.code === RESPONSE.ERROR_OK) {
        this.singers = this._normalizeSinger(res.data.list)
      }
    })
  }

  // 序列化数据
  private _normalizeSinger(list: any[]) {
    let map: any = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }
    list.forEach((item: any, index) => {
      if (index < HOT_SINGER_LEN) {
        map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      }
      const key = item.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
    })
    // 为了得到有序列表，我们需要处理 map
    let ret = []
    let hot = []
    for (let key in map) {
      let val = map[key]
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      } else if (val.title === HOT_NAME) {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .SingerPage
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
