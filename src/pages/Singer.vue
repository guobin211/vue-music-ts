<template>
  <div class="singer">
    Singer
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { dataService } from "@/service/data-service";
  import { RESPONSE } from "@/config/config";

  @Component({
    components: {},
  })
  export default class Singer extends Vue {

    public singerList = [];

    created() {
      this._getSingerList();
    }

    private _getSingerList(): void {
      dataService.getSingerList().then((res: any) => {
        if (res.code === RESPONSE.ERROR_OK) {
          this.singerList = res.data.list;
          console.log(this.singerList);
        }
      })
    }
  }
</script>

<style scoped>

</style>
