<template>
    <div class="home">
        <p>class name</p>
        <el-button type="primary" @click="openModal">button</el-button>
        <el-select :value="1"></el-select>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        components: {},
    })
    export default class Home extends Vue {
        public openModal() {
            this.$message.info('open message');
            this.$notify.info('notify');
            this.$message.warning('warn');
            const loading =this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            setTimeout(() => {
                loading.close();
            }, 2000);
        }
    }
</script>
