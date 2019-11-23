<template>
  <div class="RecommendPage" ref="recommendRef">
    <MScroll
      ref="mscrollRef"
      :data-list="discList"
      :listen-scroll="true"
      :pull-up="true"
      :before-scroll="true"
      class="recommend-content"
    >
      <div>
        <div v-if="slider.length > 0" class="slider-wrapper" ref="sliderWrapper">
          <MSlider>
            <div v-for="(item, index) in slider" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl" />
              </a>
            </div>
          </MSlider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item, index) in discList" class="item" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="icon" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </MScroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DiscItem, getDiscList, getRecommend, SliderItem } from '@/api/recommend-service'
import MScroll from '@/components/m-scroll/MScroll.vue'
import { RESPONSE } from '@/api/config'
import MSlider from '@/components/m-slider/MSlider.vue'
import { MScrollD } from '@/components/m-scroll/MScroll'

@Component({
  name: 'RecommendPage',
  components: { MSlider, MScroll }
})
export default class RecommendPage extends Vue {
  slider: SliderItem[] = []
  discList: DiscItem[] = []
  checkloaded: boolean = false

  created() {
    this._fetchRecommendList()
    this._fetchDiscList()
  }

  loadImage() {
    if (!this.checkloaded) {
      this.checkloaded = true;
      (this.$refs.mscrollRef as MScrollD).refresh()
    }
  }

  selectItem(item: DiscItem) {
    console.log(item)
  }

  private _fetchRecommendList() {
    getRecommend().then(res => {
      if (res.code === RESPONSE.ERROR_OK) {
        this.slider = res.data.slider
      }
    })
  }

  private _fetchDiscList() {
    getDiscList().then(res => {
      if (res.code === RESPONSE.ERROR_OK) {
        this.discList = res.data.list
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../core/stylus/variable"

.RecommendPage
  position: fixed
  width: 100%
  top: 88px
  bottom: 0

  .recommend-content
    height: 100%
    overflow: hidden

    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden

    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme

      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px

        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px

        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium

          .name
            margin-bottom: 10px
            color: $color-text

          .desc
            color: $color-text-d

    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
