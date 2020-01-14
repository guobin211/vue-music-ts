<template>
  <div ref="wrapper">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import BScroll, { Position } from 'better-scroll'

@Component({
  name: 'MScroll'
})
export default class MScroll extends Vue {
  @Prop({ required: true, default: () => [] }) dataList!: any[]
  @Prop({ required: false, default: 1 }) probeType!: number
  @Prop({ required: false, default: 40 }) refreshDelay!: number
  @Prop({ required: false, default: true }) click!: boolean
  @Prop({ required: false, default: false }) listenScroll!: boolean
  @Prop({ required: false, default: false }) pullUp!: boolean
  @Prop({ required: false, default: false }) beforeScroll!: boolean
  scroll!: BScroll

  @Watch('dataList')
  onDataListChange(val: any[]) {
    setTimeout(() => {
      this.refresh()
    }, this.refreshDelay)
  }

  disable() {
    this.scroll && this.scroll.disable()
  }

  enable() {
    this.scroll && this.scroll.enable()
  }

  refresh() {
    this.scroll && this.scroll.refresh()
  }

  scrollTo(x: number, y: number) {
    this.scroll && this.scroll.scrollTo(x, y)
  }

  scrollToElement(...args: any) {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, args)
  }

  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 33)
  }

  private _initScroll() {
    if (!this.$refs.wrapper) {
      return
    }
    this.scroll = new BScroll(this.$refs.wrapper as HTMLDivElement, {
      scrollX: false,
      scrollY: true,
      snap: false,
      probeType: this.probeType,
      click: this.click
    })

    if (this.listenScroll) {
      this.scroll.on('scroll', (pos: Position) => {
        this.$emit('scroll', pos)
      })
    }

    if (this.pullUp) {
      this.scroll.on('scrollEnd', (pos: Position) => {
        this.$emit('scrollEnd', pos)
      })
    }

    if (this.beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        this.$emit('beforeScroll')
      })
    }
  }
}
</script>
