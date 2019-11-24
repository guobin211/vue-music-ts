import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutation'
import state from '@/store/state'
import getters from '@/store/getters'
import actions from '@/store/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
