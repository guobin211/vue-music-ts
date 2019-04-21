declare module '*.vue' {
  import Vue from 'vue';

  class MyVue extends Vue {
    public $refs: any;

    // @ts-ignore
    constructor() {
      super();
    }
  }

  export default MyVue;
}

