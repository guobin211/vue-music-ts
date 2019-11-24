import Vue from 'vue';

export abstract class MScrollD extends Vue {
  disable: () => void
  enable: () => void
  refresh: () => void
  scrollTo: (x: number, y: number) => void
  scrollToElement: (...args: any) => void
}
