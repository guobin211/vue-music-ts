<template>
    <div class="m-slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot name="slider"></slot>
        </div>
        <div class="dots">
            <span class="dot" :class="{active: currentSliderIndex === index }" v-for="(item, index) in dots"
                  :key="index"></span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Provide, Vue } from "vue-property-decorator";
    import { addClass } from "@/utils/dom";
    import BScroll from "better-scroll";

    @Component({
        components: {},
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
    })
    export default class MSlider extends Vue {
        @Provide()
        private BSSlider: any;

        @Provide()
        private timer: any;

        @Provide()
        public currentSliderIndex: number = 0;

        @Provide()
        public dots: number[] = [];

        mounted(): void {
            setTimeout(() => {
                this.setSliderWidth(true);
                this.initSlider();
            }, 20);

            window.addEventListener('resize', () => {
                if (this.BSSlider) {
                    setTimeout(() => {
                        this.setSliderWidth(false);
                        this.BSSlider.refresh();
                    }, 20);
                }
            })
        }

        destroy(): void {
            clearTimeout(this.timer);
        }

        /**
         * 设置warp 宽度
         * @param isFirst
         */
        private setSliderWidth(isFirst: boolean) {
            const children = (this.$refs.sliderGroup as any).children;
            this.initDots(children.length);
            let width = 0;
            const sliderWidth = (this.$refs.slider as HTMLElement).clientWidth;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth
            }
            if (this.$props.loop && isFirst) {
                width += 2 * sliderWidth
            }
            (this.$refs.sliderGroup as HTMLElement).style.width = width + 'px'
        }

        /**
         * 实例化 BSSlider
         */
        private initSlider() {
            this.BSSlider = new BScroll('.m-slider', {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: this.$props.loop
                },
                click: false
            });
            this.BSSlider.on('scrollEnd', () => {
                this.currentSliderIndex = this.BSSlider.getCurrentPage().pageX;
                this.playSlider();
            });
            /**
             * 自动滚动防止多重定时器
             */
            this.BSSlider.on('beforeScrollStart', () => {
                if (this.$props.autoPlay) {
                    clearInterval(this.timer);
                }
            });
            this.playSlider();
        }

        /**
         * 自动播放
         */
        private playSlider() {
            if (this.$props.autoPlay) {
                this.timer = setTimeout(() => {
                    this.BSSlider.next();
                }, this.$props.interval)
            }
        }

        private initDots(n: number) {
            this.dots = new Array(n);
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/@color";

    .m-slider {
        min-height: 1px;

        .slider-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;

            .slider-item {
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;

                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;

                    img {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }

        .dots {
            position: absolute;
            right: 0;
            left: 0;
            bottom: 12px;
            text-align: center;
            font-size: 0;

            .dot {
                display: inline-block;
                margin: 0 4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: $color-text-l;

                &.active {
                    width: 20px;
                    border-radius: 5px;
                    background: $color-text-ll;
                }
            }
        }
    }

</style>
