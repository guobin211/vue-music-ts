<template>
    <div id="app">
        <MHeader></MHeader>
        <MTab></MTab>
        <div class="content">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <MFooter></MFooter>
        <MPlayer></MPlayer>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import MFooter from "@/common/m-footer/MFooter.vue";
    import MHeader from "@/common/m-header/MHeader.vue";
    import MPlayer from "@/common/m-player/MPlayer.vue";
    import MTab from "@/common/m-tab/MTab.vue";

    @Component({
        components: {
            MHeader,
            MFooter,
            MPlayer,
            MTab,
        },
    })
    export default class App extends Vue {
    }
</script>
<style lang="scss">
    @import "styles/@color";

    body, html {
        line-height: 1;
        width: 100%;
        height: 100%;
        font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        background: $color-background;
        color: $color-text;

        #app {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;

            .content {
                flex: 1;
            }
        }
    }

</style>
