<template>
  <div class="RecommendPage">
    <div>
      RecommendPage
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'RecommendPage'
})
export default class RecommendPage extends Vue {}
</script>

<style></style>
