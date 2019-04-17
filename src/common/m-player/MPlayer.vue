<template>

    <div class="player">
        <h1>player</h1>
    </div>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class MPlayer extends Vue {
    }
</script>

<style scoped>
    .player{
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>
