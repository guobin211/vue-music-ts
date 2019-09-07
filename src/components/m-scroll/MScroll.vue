<template>
  <div class="m-scroll" ref="scrollWarp">
    <slot name="scroll"></slot>
  </div>
</template>

<script lang="ts">
    import {Component, Emit, Vue, Watch} from "vue-property-decorator";
    import BScroll from "better-scroll";

    @Component({
        name: 'MScroll',
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
            momentum: {
                type: Boolean,
                default: true
            },
            refreshDelay: {
                type: Number,
                default: 40
            }
        }
    })
    export default class MScroll extends Vue {

        private scroll!: BScroll;

        @Watch('data')
        dataChanged() {
            setTimeout(() => {
                this.refresh();
            }, this.$props.refreshDelay)
        }

        @Emit('onScroll')
        emitScroll(pos: BScroll.Position) {
        }

        mounted() {
            setTimeout(() => {
                this._initScroll();
            }, 20)
        }

        scrollTo(x: number, y: number) {
            this.scroll && this.scroll.scrollTo(x, y)
        }

        scrollToElement(...args: any) {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, args)
        }

        refresh(): void {
            this.scroll && this.scroll.refresh();
        }

        private _initScroll() {
            this.scroll = new BScroll((this.$refs.scrollWarp as HTMLDivElement), {
                scrollX: false,
                scrollY: true,
                snap: false,
                momentum: this.$props.momentum,
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

<style lang="scss" scoped>
</style>
