<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <m-footer></m-footer>
    <m-player></m-player>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import MHeader from '@/common/MHeader.vue';
  import MFooter from '@/common/MFooter.vue';
  import MPlayer from '@/common/MPlayer.vue';

  @Component({
    components: {
      MHeader,
      MFooter,
      MPlayer,
    },
  })
  export default class App extends Vue {

  }
</script>
<style lang="stylus">
  @import "styles/normalize.css";
  html, body
    margin 0
    width 100%
    height 100%
    font-family 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback'
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing grayscale
    user-select none
    -webkit-tap-highlight-color transparent
    #app
      width 100%
      height 100%
      margin 0
      overflow-x hidden
      overflow-y scroll
      color #2c3e50
</style>
