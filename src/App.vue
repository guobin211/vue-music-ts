<template>
  <div id="app">
    <MHeader></MHeader>
    <MTab></MTab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <MPlayer></MPlayer>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">

</style>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import MHeader from '@/layout/m-header/MHeader.vue'
  import MTab from '@/layout/m-tab/MTab.vue'
  import MPlayer from '@/layout/m-player/MPlayer.vue'
  @Component({
    components: {MPlayer, MTab, MHeader}
  })
  export default class App extends Vue {
  }
</script>
