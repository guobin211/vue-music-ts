<template>
  <MScroll
    :data-list="dataList"
    :listen-scroll="listenScroll"
    :probe-type="probeType"
    ref="listViewRef"
    @scroll="onMScroll"
    class="listview"
  >
    <ul>
      <li v-for="(group, $groupIndex) in dataList" :key="$groupIndex" class="list-group" ref="listGroupRef">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <uL>
          <li
            v-for="(item, $itemIndex) in group.items"
            @click="selectItem(item)"
            class="list-group-item"
            :key="$itemIndex"
          >
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </uL>
      </li>
    </ul>
    <!-- right quick point -->
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li
          v-for="(item, $index) in shortcutList"
          :data-index="$index"
          class="item"
          :key="$index"
          :class="{ current: currentIndex === $index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixedRef" v-show="fixedTitle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div v-show="!dataList.length" class="loading-container">
      <MLoading></MLoading>
    </div>
  </MScroll>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import MScroll from '@/components/m-scroll/MScroll.vue'
import MLoading from '@/components/m-loading/MLoading.vue'
import { Singer, SingerGroup } from '@/api/singer-service'
import { MScrollD } from '@/components/m-scroll/MScroll'
import { getData } from '@/utils/dom'

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

@Component({
  name: 'MListView',
  components: { MLoading, MScroll }
})
export default class MListView extends Vue {
  @Prop({ required: true, default: () => [] }) dataList!: SingerGroup[]
  currentIndex = 0
  scrollY = -1
  diff = -1
  probeType = 3
  listenScroll = true
  listHeight: number[] = []
  touch: any = {}
  fixedTop = 0

  get shortcutList() {
    return this.dataList.map(group => {
      return group.title.substr(0, 1)
    })
  }

  get fixedTitle() {
    if (this.scrollY > 0) {
      return ''
    } else {
      return this.dataList[this.currentIndex] ? this.dataList[this.currentIndex].title : ''
    }
  }

  @Watch('dataList')
  onDataListChange() {
    setTimeout(() => {
      this._calculateHeight()
    }, 20)
  }

  @Watch('scrollY')
  onScrollYChange(newY: number) {
    const listHeight = this.listHeight
    // 当滚动到顶部，newY>0
    if (newY > 0) {
      this.currentIndex = 0
      return
    }
    // 在中间部分滚动
    for (let i = 0; i < listHeight.length - 1; i++) {
      let height1 = listHeight[i]
      let height2 = listHeight[i + 1]
      if (-newY >= height1 && -newY < height2) {
        this.currentIndex = i
        this.diff = height2 + newY
        return
      }
    }
    // 当滚动到底部，且-newY大于最后一个元素的上限
    this.currentIndex = listHeight.length - 2
  }

  @Watch('diff')
  onDiffChange(newVal: number) {
    let fixedTop = newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
    if (this.fixedTop === fixedTop) {
      return
    }
    this.fixedTop = fixedTop
    {
      (this.$refs.fixedRef as HTMLDivElement).style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }

  refresh() {
    (this.$refs.listViewRef as MScrollD).refresh()
  }

  onMScroll(pos: any) {
    this.scrollY = pos.y
  }

  selectItem(singer: Singer) {
    this.$emit('select', singer)
  }

  onShortcutTouchStart(e: TouchEvent) {
    let anchorIndex = getData(e.target, 'index')
    let firstTouch = e.touches[0]
    this.touch.y1 = firstTouch.pageY
    this.touch.anchorIndex = anchorIndex
    this._scrollTo(anchorIndex)
  }

  onShortcutTouchMove(e: TouchEvent) {
    let firstTouch = e.touches[0]
    this.touch.y2 = firstTouch.pageY
    let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
    let anchorIndex = parseInt(this.touch.anchorIndex) + delta
    this._scrollTo(anchorIndex)
  }

  private _calculateHeight() {
    this.listHeight = []
    const list = this.$refs.listGroupRef as any[]
    let height = 0
    this.listHeight.push(height)
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      height += item.clientHeight
      this.listHeight.push(height)
    }
  }

  private _scrollTo(index: number) {
    if (!index && index !== 0) {
      return
    }
    if (index < 0) {
      index = 0
    } else if (index > this.listHeight.length - 2) {
      index = this.listHeight.length - 2
    }
    this.scrollY = -this.listHeight[index]
    {
      (this.$refs.listViewRef as MScrollD).scrollToElement((this.$refs.listGroupRef as any[])[index], 0)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../core/stylus/variable"

.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      &.current
        color: $color-theme
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
