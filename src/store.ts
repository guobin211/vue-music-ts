import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import actions from './store/actions';
import mutations from './store/mutations';
import state from './store/state';
import getters from './store/getters';

Vue.use(Vuex);

const store: Store<any> = new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
  modules: {
    // 添加自定义模块
  },
});

export default store;
