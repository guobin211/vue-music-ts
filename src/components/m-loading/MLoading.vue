<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  })
  export default class MLoading extends Vue {
  }
</script>

<style scoped lang="scss">
  @import "../../styles/@color";
  .loading{
    width: 100%;
    text-align: center;
    .desc{
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
</style>
