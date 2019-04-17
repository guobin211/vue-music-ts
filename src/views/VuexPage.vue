<template>

    <div>
        <div>
            <h1>{{author.name}}</h1>
        </div>
        <div>
            <form>
                <!-- 同步改变store数据-->
                <label for="name">name: </label>
                <input id="name" type="text" placeholder="输入名字" v-model="author.name">

                <label for="name1">name: </label>
                <input id="name1" type="text" placeholder="输入名字1" v-model="myAuthor.name">

            </form>
            <button type="button" @click="changeName">更改store</button>
        </div>
    </div>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    import { Author } from '@/store/types';
    import { Getter, Mutation } from 'vuex-class';

    @Component({
        components: {},
    })
    export default class VuexPage extends Vue {

        public myAuthor: Author = new Author('');

        @Getter('author') public author: any;
        // Mutation
        @Mutation public setAuthor: any;

        public changeName() {
            // console.log(this.$store.state.author);
            // console.log(this.myAuthor);
            this.setAuthor(this.myAuthor);
            // console.log(this.$store.state.author);
        }
    }
</script>

<style scoped>

</style>
