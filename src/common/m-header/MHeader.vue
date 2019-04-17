<template>

    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Chicken Music</h1>
        <img src="./logo@2x.png" alt="">
        <router-link tag="div" class="mine" to="/user">
            <i class="icon-mine"></i>
        </router-link>
    </div>

</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class MHeader extends Vue {
    }
</script>

<style scoped lang="scss">
</style>
