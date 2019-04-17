<template>

    <div class="footer">
        <p>vue-music-ts</p>
    </div>

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  @Component
  export default class MFooter extends Vue {
  }
</script>

<style scoped lang="scss">
    .footer{
        height: 20px;
        text-align: center;
        background: rgba(247, 247, 247, 0.13);
        p{
            line-height: 20px;
            font-size: 8px;
            font-weight: 100;
        }
    }
</style>
