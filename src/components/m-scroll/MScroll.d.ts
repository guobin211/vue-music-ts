import {Vue} from "vue/types/vue";

/**
 * MScrool组件API
 */
export abstract class MScrollD extends Vue {
  probeType: number;
  click: boolean;
  listenScroll: boolean;
  data: any[];
  momentum: number;
  refreshDelay: number;
  /**
   * 滚动
   */
  scrollToElement: (...args: any) => void;
  /**
   * 刷新
   */
  refresh: () => void;
}
