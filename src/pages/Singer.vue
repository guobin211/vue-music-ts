<template>
  <div class="singer" ref="singer">
    <m-list-view :list-data="singerList" ref="list" v-if="singerList"></m-list-view>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { dataService } from "@/service/data-service";
  import { RESPONSE } from "@/config/config";
  import { SingerData } from '@/service/singer-data';
  import MListView from '@/components/m-list-view/MListView.vue';

  export interface ISinger {
    title: string;
    item: SingerData[];
  }

  const HOT_SINGER_LEN = 10;
  const HOT_NAME = '热门';

  @Component({
    components: {
      MListView,
    },
  })
  export default class Singer extends Vue {

    public singerList: ISinger[] = [];

    created() {
      this._getSingerList();
    }

    private _getSingerList(): void {
      dataService.getSingerList().then((res: any) => {
        if (res.code === RESPONSE.ERROR_OK) {
          this.singerList = this._transformData(res.data.list);
        }
      })
    }

    private _transformData(list: any[]) {
      let map: any = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item: any, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new SingerData(item.Fsinger_mid, item.Fsinger_name))
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new SingerData(item.Fsinger_mid, item.Fsinger_name))
      });
      // 为了得到有序列表，我们需要处理 map
      const ret = [];
      const hot = [];
      // @ts-ignore
      for (const key in map) {
        const val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      });
      return hot.concat(ret)
    }
  }
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }
</style>
