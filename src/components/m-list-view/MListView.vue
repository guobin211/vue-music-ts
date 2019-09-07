<template>

  <m-scroll :data="listData" :listen-scroll="isListenScroll" :probe-type="probeType" @onScroll="handleScroll"
            class="list-view" ref="scroll">
    <template v-slot:scroll>
      <ul>
        <li :key="index" class="list-group" ref="listGroup" v-for="(group, index) in listData">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li @click="selectItem(item)" class="list-group-item" v-for="item in group.items">
              <img @load="loadImg" class="avatar" v-lazy="item.avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 侧边导航 -->
      <div @touchend.stop @touchmove.stop.prevent="onShortcutTouchMove"
           @touchstart.stop.prevent="onShortcutTouchStart"
           class="list-shortcut">
        <ul>
          <li :class="{'current':currentIndex===index}" :data-index="index" class="item"
              v-for="(item, index) in shortcutList">{{item}}
          </li>
        </ul>
      </div>
      <div class="list-fixed" ref="fixed" v-show="fixedTitle">
        <div class="fixed-title">{{fixedTitle}}</div>
      </div>
      <div class="loading-container" v-show="!listData.length">
        <m-loading></m-loading>
      </div>
    </template>
  </m-scroll>

</template>

<script lang="ts">
  import { Component, Emit, Vue, Watch } from "vue-property-decorator";
  import MScroll from '../m-scroll/MScroll.vue';
  import MLoading from '../m-loading/MLoading.vue';
  import { getData } from "@/utils/dom";
  import { SingerData } from '@/service/singer-data';
  import { MScrollD } from "@/components/m-scroll/MScroll";

  const ANCHOR_HEIGHT = 18;
  const TITLE_HEIGHT = 30;

  @Component({
    props: {
      listData: {
        type: Array,
        default: null
      }
    },
    components: {
      MScroll,
      MLoading,
    }
  })
  export default class MListView extends Vue {

    public isListenScroll = true;
    public probeType = 3;
    public checkLoaded = false;

    // 记录当前滚动位置
    public scrollY = -1;
    // 右侧联动响应
    public currentIndex = 0;

    // 固定title
    get fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.$props.listData[this.currentIndex] ? this.$props.listData[this.currentIndex].title : '';
    };

    public diff = -1;
    public fixedTop = 0;

    // 不被data 绑定的数据 存储当前滚动的位置
    private touchData: any;
    // 滚动区域高度分步
    private listHeight: number[] = [];

    // 侧边快速操作
    get shortcutList() {
      return this.$props.listData.map((group: any) => {
        return group.title.substr(0, 1)
      })
    }

    // 监听输入data 计算list高度分布
    @Watch('listData')
    listDataChange() {
      setTimeout(() => {
        this._computedListHeight();
      }, 20)
    }

    @Watch('scrollY')
    onScrollYChange(newY: number) {
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0;
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          // fixed title 偏移
          this.diff = height2 + newY;
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    }

    @Watch('diff')
    onDiffChange(newVal: number) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop;
      (this.$refs.fixed as HTMLElement).style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }

    @Emit('onSelected')
    onSelected(e: any) {
    }

    onShortcutTouchStart(e: TouchEvent) {
      const elIndex = getData(e.target, 'index');
      this.touchData.y1 = e.touches[0].pageY;
      this.touchData.anchorIndex = elIndex;
      this._scrollTo(this.touchData.anchorIndex);
    }

    onShortcutTouchMove(e: TouchEvent) {
      this.touchData.y2 = e.touches[0].pageY;
      const delta = Math.ceil((this.touchData.y2 - this.touchData.y1) / ANCHOR_HEIGHT);
      // 将要滚动的位置
      const anchorIndex = parseInt(this.touchData.anchorIndex, 10) + delta;
      this._scrollTo(anchorIndex);
    }

    selectItem(e: SingerData) {
      this.onSelected(e);
    }

    handleScroll(e: { x: number, y: number }) {
      this.scrollY = e.y;
    }

    private _scrollTo(index: number) {
      if (index === null || isNaN(index)) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index];
      // 调用 scroll 组件的方法
      (this.$refs.scroll as MScrollD).scrollToElement((this.$refs.listGroup as any[])[index], 0);
    }

    private _computedListHeight() {
      const list: Element[] = this.$refs.listGroup as Element[];
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }

    loadImg() {
      if (!this.checkLoaded) {
        (this.$refs.scroll as MScrollD).refresh();
        this.checkLoaded = true;
      }
    }

    created(): void {
      this.touchData = {
        y1: 0,
        y2: 0,
        anchorIndex: '0'
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/@color";

  .list-view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;

    .list-group {
      padding-bottom: 30px;

      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }

      .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .name {
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
    }

    .list-shortcut {
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: $color-background-d;
      font-family: Helvetica, serif;

      .item {
        padding: 3px;
        line-height: 1;
        color: $color-text-l;
        font-size: $font-size-small;

        &.current {
          color: $color-theme
        }
      }
    }

    .list-fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      .fixed-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
    }
  }
</style>
