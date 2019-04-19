<template>
    <div class="m-scroll">
        MScroll
    </div>
</template>

<script lang="ts">
    import {Component, Vue } from "vue-property-decorator";
    // import Component from 'vue-class-component'

    @Component({
        components: {},
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            },
            pullUp: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        }
    })
    export default class MScroll extends Vue {

        mounted() {
        }
    }
</script>

<style scoped>

</style>
