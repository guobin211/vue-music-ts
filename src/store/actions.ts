import { ActionTree } from 'vuex'
import { RootStateTypes } from '@/store/types'

const actions: ActionTree<RootStateTypes, any> = {

  /**
   * 选中播放
   * @param injected
   * @param payload
   */
  selectPlay: (injected, payload: {song: any[], index: number}) => {
    injected.commit('SET_PLAYLIST', payload.song )
    injected.commit('SET_SEQUENCE_LIST', payload.song )
    injected.commit('SET_CURRENT_INDEX', payload.index )
    injected.commit('SET_FULL_SCREEN', true )
    injected.commit('SET_PLAYING_STATE', true )
  }
}

export default actions
