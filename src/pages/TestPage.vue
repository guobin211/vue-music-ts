<template>
  <div class="">

  </div>
</template>

<script lang="ts">
  import { Component, Vue, Emit, Watch, Prop, Model } from "vue-property-decorator";
  import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

  @Component({
    components: {},
    props: {
      inputData: {
        type: String,
        default: ''
      }
    }
  })
  export default class TestPage extends Vue {

    public count: number = 0;

    @Watch('count')
    onCountChanged(val: string, oldVal: string) { }

    @Emit('inputDataChanged')
    onInputDataChanged(n: number) {}

    @Emit('promise')
    promise() {
      return new Promise((resolve: any) => {
        setTimeout(() => {
          resolve(22)
        }, 0)
      })
    }
    beforeRouteEnter(to: any, from: any, next: Function): void {
      console.log(to);
      next();
    }
    created(): void {
      this.promise();
      this.onInputDataChanged(11);
    }

    mounted(): void {

    }

    beforeDestroy(): void {

    }

  }
</script>

<style scoped>

</style>
