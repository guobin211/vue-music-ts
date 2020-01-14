<template>
  <transition name="slide">
    <MMusicList :title="title" :bg-image="bgImage" :songs="songs"/>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MMusicList from '@/components/m-music-list/MMusicList.vue'
import { getSingerDetail, Singer } from '@/api/singer-service'
import { Getter } from 'vuex-class'
import { RESPONSE } from '@/api/config'
import { createSong, Song } from '@/api/song-service'

@Component({
  name: 'SingerDetail',
  components: {MMusicList}
})
export default class SingerDetail extends Vue {
  @Getter('singer') singer?: Singer
  songs: Song[] = []

  get title() {
    return this.singer ? this.singer.name : ''
  }

  get bgImage() {
    return this.singer ? this.singer.avatar : ''
  }

  created() {
    this._fetchDetail()
  }

  private _fetchDetail() {
    if (!this.singer) {
      this.$router.push({
        path: '/singer'
      })
      return
    }
    getSingerDetail(this.singer!.id).then(res => {
      if (res.code === RESPONSE.ERROR_OK) {
        this.songs = this._normalizeSongs(res.data.list)
      }
    })
  }

  private _normalizeSongs(list: any[]) {
    let ret: any[] = []
    list.forEach((item) => {
      let {musicData} = item
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
