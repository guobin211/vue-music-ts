<template>
  <div class="MPlayer" v-show="playList.length > 0">
    <transition name="normal">
      <div class="normal-player" v-if="currentSong" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image"  alt=""/>
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"/>
          </div>
          <h1 class="title" v-html="currentSong.name"/>
          <h2 class="subtitle" v-html="currentSong.singer"/>
        </div>
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image"  alt=""/>
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ playingLyric }}</div>
            </div>
          </div>
          <!-- scroll -->
          <MScroll class="middle-r" ref="lyricList" :data-list="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{ current: currentLineNum === index }"
                  v-for="(line, index) in currentLyric.lines"
                  :key="index"
                >
                  {{ line.txt }}
                </p>
              </div>
            </div>
          </MScroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"/>
            <span class="dot" :class="{ active: currentShow === 'lyric' }"/>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ format(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <MProgress :percent="percent" @percentChange="onProgressBarChange"/>
            </div>
            <span class="time time-r">{{ format(currentSong.duration) }}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"/>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="prev" class="icon-prev"/>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlaying" :class="playIcon"/>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-next"/>
            </div>
            <div class="icon i-right">
              <i @click="toggleFavorite(currentSong)" class="icon" :class="getFavoriteIcon(currentSong)"/>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-if="currentSong" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" width="40" height="40" :src="currentSong.image"  alt=""/>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"/>
          <p class="desc" v-html="currentSong.singer"/>
        </div>
        <div class="control"></div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist"/>
        </div>
      </div>
    </transition>
    <MPlayList/>
    <audio
      ref="audio"
      :src="currentSong ? currentSong.url : ''"
      @play="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import Lyric from 'lyric-parser'
import { PlayMode } from '@/store/cache-service'
import MPlayList from '@/layout/m-play-list/MPlayList.vue'
import { Song } from '@/api/song-service'
import MScroll from '@/components/m-scroll/MScroll.vue'
import MProgress from '@/components/m-progress/MProgress.vue'
import { prefixStyle } from '@/utils/dom'
import { shuffle } from '@/utils/utils'

interface LyricParams {
  lineNum: number
  txt: string
}
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

@Component({
  name: 'MPlayer',
  components: { MProgress, MScroll, MPlayList }
})
export default class MPlayer extends Vue {
  @Getter('playList') playList!: any[]
  @Getter('mode') mode!: PlayMode
  @Getter('fullScreen') fullScreen!: boolean
  @Getter('playing') playing!: boolean
  @Getter('currentSong') currentSong?: Song
  @Getter('currentIndex') currentIndex!: number
  @Getter('sequenceList') sequenceList!: any[]
  @Mutation('SET_FULL_SCREEN') SET_FULL_SCREEN!: (full: boolean) => void
  @Mutation('SET_CURRENT_INDEX') SET_CURRENT_INDEX!: (index: number) => void
  @Mutation('SET_PLAYING_STATE') SET_PLAYING_STATE!: (state: boolean) => void
  @Mutation('SET_PLAY_MODE') SET_PLAY_MODE!: (mode: PlayMode) => void
  @Mutation('SET_PLAYLIST') SET_PLAYLIST!: (list: any[]) => void
  songReady = false
  currentLyric: any = null
  currentTime = 0
  currentLineNum = 0
  currentShow = 'cd'
  playingLyric = ''
  favoriteList = []
  timer = 0
  touch: any = {}
  get iconMode() {
    switch (this.mode) {
      case PlayMode.SEQUENCE:
        return 'icon-sequence'
      case PlayMode.LOOP:
        return 'icon-loop'
      case PlayMode.RANDOM:
        return 'icon-random'
    }
  }
  get cdCls() {
    return this.playing ? 'play' : 'play pause'
  }
  get playIcon() {
    return this.playing ? 'icon-pause' : 'icon-play'
  }
  get miniIcon() {
    return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
  }
  get disableCls() {
    return this.songReady ? '' : 'disable'
  }
  get percent() {
    if (this.currentSong) {
      return this.currentTime / this.currentSong.duration
    } else {
      return 0
    }
  }

  @Watch('currentSong', { deep: true, immediate: true })
  onPlayListChange(newSong: any, oldSong: any) {
    if (newSong && oldSong && newSong.id === oldSong.id) {
      return
    }
    if (this.currentLyric) {
      this.currentLyric.stop()
      this.currentTime = 0
      this.playingLyric = ''
      this.currentLineNum = 0
    }
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      (this.$refs.audio as HTMLAudioElement).play().then().catch(error => {
        console.log(error)
      })
      this.getLyric()
    }, 1000)
  }

  @Watch('fullScreen')
  onFullScreenChange(newVal: boolean) {
    if (newVal) {
      setTimeout(() => {
        // @ts-ignore
        this.$refs.lyricList.refresh()
      }, 33)
    }
  }

  @Watch('playing')
  onPlayingChange(newPlaying: boolean) {
    this.$nextTick(() => {
      // @ts-ignore
      newPlaying ? this.$refs.audio.play() : this.$refs.audio.pause()
    })
  }

  back() {
    this.SET_FULL_SCREEN(false)
  }

  middleTouchStart(e: any) {
    this.touch.initiated = true
    // 用来判断是否是一次移动
    this.touch.moved = false
    const touch = e.touches[0]
    this.touch.startX = touch.pageX
    this.touch.startY = touch.pageY
  }

  middleTouchMove(e: any) {
    if (!this.touch.initiated) {
      return
    }
    const touch = e.touches[0]
    const deltaX = touch.pageX - this.touch.startX
    const deltaY = touch.pageY - this.touch.startY
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return
    }
    if (!this.touch.moved) {
      this.touch.moved = true
    }
    const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
    // @ts-ignore
    this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    // @ts-ignore
    this.$refs.lyricList.$el.style[transitionDuration] = 0
    // @ts-ignore
    this.$refs.middleL.style.opacity = 1 - this.touch.percent
    // @ts-ignore
    this.$refs.middleL.style[transitionDuration] = 0
  }

  middleTouchEnd(e: any) {
    if (!this.touch.moved) {
      return
    }
    let offsetWidth
    let opacity
    if (this.currentShow === 'cd') {
      if (this.touch.percent > 0.1) {
        offsetWidth = -window.innerWidth
        opacity = 0
        this.currentShow = 'lyric'
      } else {
        offsetWidth = 0
        opacity = 1
      }
    } else {
      if (this.touch.percent < 0.9) {
        offsetWidth = 0
        this.currentShow = 'cd'
        opacity = 1
      } else {
        offsetWidth = -window.innerWidth
        opacity = 0
      }
    }
    const time = 300
    // @ts-ignore
    this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    // @ts-ignore
    this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
    // @ts-ignore
    this.$refs.middleL.style.opacity = opacity
    // @ts-ignore
    this.$refs.middleL.style[transitionDuration] = `${time}ms`
    this.touch.initiated = false
  }

  showPlaylist() {
    // @ts-ignore
    this.$refs.playlist.show()
  }

  open() {
    this.SET_FULL_SCREEN(true)
  }

  changeMode() {
    const mode = (this.mode + 1) % 3
    this.SET_PLAY_MODE(mode)
    let list = null
    if (mode === PlayMode.RANDOM) {
      list = shuffle(this.sequenceList)
    } else {
      list = this.sequenceList
    }
    this.resetCurrentIndex(list)
    this.SET_PLAYLIST(list)
  }

  resetCurrentIndex(list: any[]) {
    let index = list.findIndex(item => {
      return item.id === this.currentSong!.id
    })
    this.SET_CURRENT_INDEX(index)
  }

  prev() {
    if (!this.songReady) {
      return
    }
    if (this.playList.length === 1) {
      this.loop()
      return
    } else {
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.SET_CURRENT_INDEX(index)
      if (!this.playing) {
        this.togglePlaying()
      }
    }
    this.songReady = false
  }

  togglePlaying() {
    if (!this.songReady) {
      return
    }
    this.SET_PLAYING_STATE(!this.playing)
    if (this.currentLyric) {
      this.currentLyric.togglePlay()
    }
  }

  next() {
    if (!this.songReady) {
      return
    }
    if (this.playList.length === 1) {
      this.loop()
      return
    } else {
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.SET_CURRENT_INDEX(index)
      if (!this.playing) {
        this.togglePlaying()
      }
    }
    this.songReady = false
  }

  toggleFavorite() {
    // todo
  }

  getFavoriteIcon(song: any) {
    if (this.favoriteList.some((el: any) => el.id === song.id)) {
      return 'icon-favorite'
    }
    return 'icon-not-favorite'
  }

  ready() {
    this.songReady = true
    // TODO
    // this.savePlayHistory(this.currentSong)
  }
  error() {
    this.songReady = true
  }
  updateTime(e: any) {
    this.currentTime = e.target.currentTime
  }
  end() {
    if (this.mode === PlayMode.LOOP) {
      this.loop()
    } else {
      this.next()
    }
  }

  loop() {
    // @ts-ignore
    this.$refs.audio.currentTime = 0
    // @ts-ignore
    this.$refs.audio.play()
    this.SET_PLAYING_STATE(true)
    if (this.currentLyric) {
      this.currentLyric.seek(0)
    }
  }
  format(interval: any) {
    function _pad(num: any, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
    interval = interval | 0
    const minute = (interval / 60) | 0
    const second = _pad(interval % 60)
    return `${minute}:${second}`
  }

  onProgressBarChange(percent: number) {
    let currentTime = 0
    if (this.currentSong) {
       currentTime = this.currentSong.duration * percent
    }
    // @ts-ignore
    this.$refs.audio.currentTime = currentTime
    if (!this.playing) {
      this.togglePlaying()
    }
    if (this.currentLyric) {
      this.currentLyric.seek(currentTime * 1000)
    }
  }

  getLyric() {
    if (this.currentSong !== undefined) {
      this.currentSong
        .getLyric()
        .then(lyric => {
          if (this.currentSong!.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        })
        .catch(() => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
    }
  }

  handleLyric(params: LyricParams) {
    this.currentLineNum = params.lineNum
    if (params.lineNum > 5) {
      // @ts-ignore
      let lineEl = this.$refs.lyricLine[params.lineNum - 5]
      // @ts-ignore
      this.$refs.lyricList.scrollToElement(lineEl, 1000)
    } else {
      // @ts-ignore
      this.$refs.lyricList.scrollTo(0, 0, 1000)
    }
    this.playingLyric = params.txt
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../core/stylus/variable"
@import "../../core/stylus/mixin"

.MPlayer
  .normal-player
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      opacity: 0.6
      filter: blur(20px)
    .top
      position: relative
      margin-bottom: 25px
      .back
        position absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 9px
          font-size: $font-size-large-x
          color: $color-theme
          transform: rotate(-90deg)
      .title
        width: 70%
        margin: 0 auto
        line-height: 40px
        text-align: center
        no-wrap()
        font-size: $font-size-large
        color: $color-text
      .subtitle
        line-height: 20px
        text-align: center
        font-size: $font-size-medium
        color: $color-text
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 10px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%

        .playing-lyric-wrapper
          width: 80%
          margin: 30px auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric
            height: 20px
            line-height: 20px
            font-size: $font-size-medium
            color: $color-text-l
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text
    .bottom
      position: absolute
      bottom: 50px
      width: 100%
      .dot-wrapper
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          vertical-align: middle
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: $color-text-l
          &.active
            width: 20px
            border-radius: 5px
            background: $color-text-ll
      .progress-wrapper
        display: flex
        align-items: center
        width: 80%
        margin: 0px auto
        padding: 10px 0
        .time
          color: $color-text
          font-size: $font-size-small
          flex: 0 0 30px
          line-height: 30px
          width: 30px
          &.time-l
            text-align: left
          &.time-r
            text-align: right
        .progress-bar-wrapper
          flex: 1
      .operators
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 20px
          text-align: center
          i
            font-size: 40px
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity: 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
    .icon
      flex: 0 0 40px
      width: 40px
      padding: 0 10px 0 20px
      img
        border-radius: 50%
        &.play
          animation: rotate 10s linear infinite
        &.pause
          animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        no-wrap()
        font-size: $font-size-medium
        color: $color-text
      .desc
        no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 30px
        color: $color-theme-d
      .icon-mini
        font-size: 32px
        position: absolute
        left: 0
        top: 0

@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
