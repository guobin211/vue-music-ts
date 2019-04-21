<template>
  <div class="recommend">
    <!--  scroll 组件  -->
    <m-scroll :data="discList" :listen-scroll="true" @onScroll="handleScroll" class="recommend-warp"
              ref="scroll">
      <template v-slot:scroll>
        <div>
          <div class="slider-warp">
            <!--  slider组件  -->
            <m-slider v-if="recommends.length > 0">
              <template v-slot:slider>
                <div :key="index" v-for="(item, index) in recommends">
                  <a :href="item.linkUrl">
                    <img :src="item.picUrl" @load="loadImg" alt="slider">
                  </a>
                </div>
              </template>
            </m-slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li :key="index" @click="selectItem(item)" class="item" v-for="(item, index) in discList">
                <div class="icon">
                  <img height="60" v-lazy="item.imgurl" width="60">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="loading-container" v-show="!discList.length">
            <m-loading></m-loading>
          </div>
        </div>
      </template>
    </m-scroll>
  </div>

</template>

<script lang="ts">
  import { Component, Provide, Vue } from "vue-property-decorator";
  import { dataService } from "@/service/data-service";
  import { RESPONSE } from "@/config/config";
  import MSlider from "@/components/m-slider/MSlider.vue";
  import MScroll from '@/components/m-scroll/MScroll.vue';
  import MLoading from '@/components/m-loading/MLoading.vue';


  export interface IRecommends {
    linkUrl: string;
    picUrl: string;
  }

  export interface IDiscList {
    imgurl: string;
    creator: {
      name: string,
      dissname: string
    }
  }

  @Component({
    components: {
      MSlider,
      MScroll,
      MLoading,
    }
  })
  export default class Recommend extends Vue {
    @Provide() recommends: IRecommends[] = [];
    @Provide() discList: IDiscList[] = [];
    private checkloaded: boolean = false;

    created() {
      this._getRecommend();
      this._getDiscList();
    }

    handleScroll(e: any) {
      console.log(e);
    }

    public selectItem(el: any) {
      console.log(el);
    }

    public loadImg() {
      if (!this.checkloaded) {
        (this.$refs.scroll as any).refresh();
        this.checkloaded = true;
      }
    }

    private _getRecommend(): void {
      dataService.getRecommend().then((res: any) => {
        if (res.code === RESPONSE.ERROR_OK) {
          this.recommends = res.data.slider;
        }
      })
    }

    private _getDiscList(): void {
      dataService.getDiscList().then((res: any) => {
        if (res.code === RESPONSE.ERROR_OK) {
          this.discList = res.data.list;
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/@color";

  .recommend {
    .recommend-warp {
      position: fixed;
      width: 100%;
      top: 88px;
      bottom: 0;
      overflow: hidden;

      .slider-warp {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      ul {
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;

          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }

          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;

            .name {
              margin-bottom: 10px;
              color: $color-text;
            }

            .desc {
              color: $color-text-d;
            }
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
