<template>
  <div class="m-scroll" ref="warp">
    <div>
      <slot name="scroll"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Vue, Watch } from "vue-property-decorator";
  import BScroll from "better-scroll";

  @Component({
    components: {},
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    }
  })
  export default class MScroll extends Vue {

    private scroll: BScroll | undefined;

    @Watch('data')
    dataChanged() {
      setTimeout(() => {
        this.refresh();
      }, this.$props.refreshDelay)
    }

    @Emit('onScroll')
    emitScroll(pos: BScroll.Position) {}

    mounted() {
      setTimeout(() => {
        this._initScroll();
      }, 20)
    }

    scrollTo(x: number, y: number) {
      this.scroll && this.scroll.scrollTo(x, y)
    }

    scrollToElement(el: HTMLElement) {
      this.scroll && this.scroll.scrollToElement(el)
    }

    refresh(): void {
      this.scroll && this.scroll.refresh();
    }

    private _initScroll() {
      this.scroll = new BScroll('.m-scroll', {
        scrollX: false,
        scrollY: true,
        snap: {
          loop: false
        },
        momentum: false,
        probeType: this.$props.probeType,
        click: this.$props.click,
      });

      if (this.$props.listenScroll) {
        this.scroll.on('scrollEnd', (pos: BScroll.Position) => {
          this.emitScroll(pos);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
