<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>data: {{dataName}}</p>
    <p>data: {{dataAge}}</p>
    <p>rating: {{rating}}</p>
    <div ref="redDiv">
      <h1>ref</h1>
    </div>
    <button type="button" @click="changeAge">change age</button>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  // computed
  get rating(): number {
    return this.dataAge + 10;
  }
  // data
  public dataName: string = 'name';
  public dataAge: number = 22;

  // $emit
  @Emit('ageChange')
  public ageChange(age: number) {
    console.log(age);
  }
  // watch
  @Watch('dataAge')
  public onDataAgeChanged(cur: string, old: string) {
    console.log('onDataAgeChanged');
    console.log(old);
    console.log(cur);
  }
  public created() {
    console.log('created');
  }

  // 生命周期
  private beforeCreate() {
    console.log('beforeCreate');
  }
  private beforeMount() {
    console.log('beforeMount');
  }
  private mounted() {
    console.log('mounted');
  }
  private beforeUpdate() {
    console.log('beforeUpdate');
  }
  private updated() {
    console.log('updated');
  }
  private activated() {
    console.log('activated');
  }
  private deactivated() {
    console.log('deactivated');
  }
  private beforeDestroy() {
    console.log('beforeDestroy');
  }
  private destroyed() {
    console.log('destroyed');
  }
  // methods
  private changeAge() {
    this.dataAge++;
    // emit
    this.ageChange(this.dataAge);
    // console.log(this.$parent.pageName);
    // this.$parent.inputString = 'amd';
    // console.log(this.$parent.inputString);
    console.log(this.$refs.redDiv);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
