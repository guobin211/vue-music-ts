<template>
  <div class="MPlayer" v-show="false">MPlayer</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'MPlayer'
})
export default class MPlayer extends Vue {}
</script>

<style scoped>
.MPlayer {
}
</style>
