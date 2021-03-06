<template>
  <div class="MMusicList">
    <div class="back" @click="back">
      <i class="icon-back"/>
    </div>
    <h1 class="title" v-html="title"/>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length > 0" class="play" @click="random">
          <i class="icon-play"/>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <MScroll
      :data-list="songs"
      @scroll="scroll"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      class="list"
      ref="listRef"
    >
      <div class="song-list-wrapper">
        <MSongList :songs="songs" :rank="rank" @select="selectItem"/>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <MLoading/>
      </div>
    </MScroll>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Song } from '@/api/song-service'
import { prefixStyle } from '@/utils/dom'
import MScroll from '@/components/m-scroll/MScroll.vue'
import MLoading from '@/components/m-loading/MLoading.vue'
import MSongList from '@/components/m-song-list/MSongList.vue'

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

@Component({
  name: 'MMusicList',
  components: { MSongList, MLoading, MScroll }
})
export default class MMusicList extends Vue {
  @Prop({ required: false, default: '' }) bgImage!: string
  @Prop({ required: false, default: () => [] }) songs!: Song[]
  @Prop({ required: false, default: '' }) title!: string
  @Prop({ required: false, default: false }) rank!: boolean
  @Action('selectPlay') selectPlay!: (data: any) => void;
  scrollY = 0
  probeType = 3
  listenScroll = true
  imageHeight = 0
  minTransalteY = 0

  get bgStyle() {
    return `background-image:url(${this.bgImage})`
  }

  @Watch('scrollY')
  onScrollYChange(newVal: number) {
    let translateY = Math.max(this.minTransalteY, newVal)
    let scale = 1
    let zIndex = 0
    let blur = 0
    const percent = Math.abs(newVal / this.imageHeight)
    if (newVal > 0) {
      scale = 1 + percent
      zIndex = 10
    } else {
      blur = Math.min(20, percent * 20)
    }
    // @ts-ignore
    this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
    // @ts-ignore
    this.$refs.filter.style[backdrop] = `blur(${blur}px)`
    // 折叠收起
    if (newVal < this.minTransalteY) {
      zIndex = 10
      // @ts-ignore
      this.$refs.bgImage.style.paddingTop = 0
      // @ts-ignore
      this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
      // @ts-ignore
      this.$refs.bgImage.style.display = ''
      // @ts-ignore
      this.$refs.bgImage.style.height = '40px'
      // @ts-ignore
      this.$refs.playBtn.style.display = 'none'
    } else {
      // @ts-ignore
      this.$refs.bgImage.style.display = ''
      // @ts-ignore
      this.$refs.bgImage.style.paddingTop = '70%'
      // @ts-ignore
      this.$refs.bgImage.style.height = 0
      // @ts-ignore
      this.$refs.playBtn.style.display = ''
    }
    // @ts-ignore
    this.$refs.bgImage.style[transform] = `scale(${scale})`
    // @ts-ignore
    this.$refs.bgImage.style.zIndex = zIndex
  }

  mounted() {
    this.imageHeight = (this.$refs.bgImage as HTMLDivElement).clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    // @ts-ignore
    this.$refs.listRef.$el.style.top = `${this.imageHeight}px`
  }

  // 播放歌单
  selectItem(ev: any) {
    this.selectPlay({
      song: this.songs,
      index: ev.index
    })
  }

  // 随机播放
  random() {
    // todo
  }

  back() {
    this.$router.back()
  }

  scroll(pos: any) {
    this.scrollY = pos.y
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../core/stylus/variable"
@import "../../core/stylus/mixin"

.MMusicList
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background

  .back
    position absolute
    top: 0
    left: 6px
    z-index: 50

    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme

  .title
    position: absolute
    top: 0
    left: 10%
    z-index: 40
    width: 80%
    no-wrap()
    text-align: center
    line-height: 40px
    font-size: $font-size-large
    color: $color-text

  .bg-image
    position: relative
    width: 100%
    height: 0
    padding-top: 70%
    transform-origin: top
    background-size: cover

    .play-wrapper
      position: absolute
      bottom: 20px
      z-index: 50
      width: 100%

      .play
        box-sizing: border-box
        width: 135px
        padding: 7px 0
        margin: 0 auto
        text-align: center
        border: 1px solid $color-theme
        color: $color-theme
        border-radius: 100px
        font-size: 0

        .icon-play
          display: inline-block
          vertical-align: middle
          margin-right: 6px
          font-size: $font-size-medium-x

        .text
          display: inline-block
          vertical-align: middle
          font-size: $font-size-small

    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.4)

  .bg-layer
    position: relative
    height: 100%
    background: $color-background

  .list
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: $color-background

    .song-list-wrapper
      padding: 20px 30px

    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
