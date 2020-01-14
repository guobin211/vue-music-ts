<template>
  <div class="MSongList">
    <ul>
      <li @click="selectItem(song, $index)" class="item" v-for="(song, $index) in songs" :key="$index">
        <div class="rank" v-show="rank">
          <span :class="getRankCls($index)" v-text="getRankText($index)"/>
        </div>
        <div class="content">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ getDesc(song) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Song } from '@/api/song-service'

@Component({
  name: 'MSongList'
})
export default class MSongList extends Vue {
  @Prop({required: true, default: () => []}) songs!: Song[]
  @Prop({required: true, default: false}) rank!: boolean

  getDesc(song: Song) {
    return `${song.singer}·${song.album}`
  }

  getRankCls(index: number) {
    if (index <= 2) {
      return `icon icon${index}`
    } else {
      return 'text'
    }
  }

  getRankText(index: number) {
    if (index > 2) {
      return index + 1
    }
  }

  selectItem(song: Song, index: string) {
    this.$emit('select', { song, index })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../core/stylus/variable"
  @import "../../core/stylus/mixin"

  .MSongList
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>
