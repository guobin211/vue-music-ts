<template>
  <transition name="slide">
    <div class="singer-detail">
      SingerDetail
    </div>
  </transition>
</template>

<script lang="ts">
  import { Component, Emit, Vue, Watch } from "vue-property-decorator";

  @Component({})
  export default class SingerDetail extends Vue {

    @Watch('data')
    onDataChanged(val: string, oldVal: string) {
    }

    @Emit('reset')
    onReset(n: number) {
    }

    created(): void {

    }

    mounted(): void {

    }

    beforeDestroy(): void {

    }

  }
</script>

<style lang="scss" scoped>
  @import "../styles/@color";

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  .singer-detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: $color-background;
  }

</style>
