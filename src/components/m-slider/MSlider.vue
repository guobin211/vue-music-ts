<template>
  <div class="MSlider" ref="sliderRef">
    <div class="slider-group" ref="sliderGroup">
      <slot/>
    </div>
    <div class="dots">
      <span
        class="dot"
        :class="{ active: currentPageIndex === index }"
        v-for="(item, index) in dots"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BScroll from 'better-scroll'
import { addClass } from '@/utils/dom'

@Component({
  name: 'MSlider'
})
export default class MSlider extends Vue {
  @Prop({ required: false, default: true }) loop!: boolean
  @Prop({ required: false, default: true }) autoPlay!: boolean
  @Prop({ required: false, default: 4000 }) interval!: number
  currentPageIndex = 0
  dots: any[] = []
  private timer: number = 0
  private BSSlider!: BScroll

  mounted() {
    this.$nextTick(() => {
      this._setSliderWidth()
      this._initSlider()
    })
    window.addEventListener('resize', () => {
      if (!this.BSSlider) {
        return
      }
      this._setSliderWidth(true)
      this.BSSlider.refresh()
    })
  }

  activated() {
    if (this.autoPlay) {
      this._play()
    }
  }

  deactivated() {
    clearTimeout(this.timer)
  }

  beforeDestroy() {
    clearTimeout(this.timer)
  }

  playSlider() {
    if (this.$props.autoPlay) {
      this.timer = setTimeout(() => {
        this.BSSlider.next();
      }, this.$props.interval)
    }
  }

  private _setSliderWidth(isResize?: boolean) {
    const children: any = (this.$refs.sliderGroup as HTMLDivElement).children
    this._initDots(children.length)
    let width = 0
    const sliderWidth = (this.$refs.sliderRef as HTMLDivElement).clientWidth
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      addClass(child, 'slider-item');
      child.style.width = sliderWidth + 'px';
      width += sliderWidth
    }
    if (this.loop && !isResize) {
      width += 2 * sliderWidth
    }
    (this.$refs.sliderGroup as HTMLElement).style.width = width + 'px'
  }

  private _initDots(n: number) {
    this.dots = new Array(n)
  }

  private _initSlider() {
    this.BSSlider = new BScroll(this.$refs.sliderRef as HTMLDivElement, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.loop
      },
      click: false
    })
    this.BSSlider.on('scrollEnd', () => {
      this.currentPageIndex = this.BSSlider.getCurrentPage().pageX;
      this.playSlider();
    })
    this.BSSlider.on('beforeScrollStart', () => {
      if (this.autoPlay) {
        clearInterval(this.timer)
      }
    })
  }

  private _play() {
    let pageIndex = this.currentPageIndex + 1
    if (this.loop) {
      pageIndex += 1
    }
    this.timer = setTimeout(() => {
      this.BSSlider.goToPage(pageIndex, 0, 400)
    }, this.interval)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../core/stylus/variable"

.MSlider
  min-height: 1px
  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slider-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>
