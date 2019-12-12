import { ActionTree } from 'vuex'
import { RootStateTypes } from '@/store/types'

const actions: ActionTree<RootStateTypes, any> = {

  /**
   * 选中播放
   * @param injectee
   * @param payload
   */
  selectPlay: (injectee, payload: {song: any[], index: number}) => {
    injectee.commit('SET_PLAYLIST', payload.song )
    injectee.commit('SET_SEQUENCE_LIST', payload.song )
    injectee.commit('SET_CURRENT_INDEX', payload.index )
    injectee.commit('SET_FULL_SCREEN', true )
    injectee.commit('SET_PLAYING_STATE', true )
  }
}

export default actions
