<template>
  <div class="MLoading">
    <img width="24" height="24" src="./loading.gif" alt="load" />
    <p class="desc">{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'MLoading'
})
export default class MLoading extends Vue {
  @Prop({ required: false, default: '正在载入...' }) title!: string
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../core/stylus/variable"

.loading
  width: 100%
  text-align: center
  .desc
    line-height: 20px
    font-size: $font-size-small
    color: $color-text-l
</style>
