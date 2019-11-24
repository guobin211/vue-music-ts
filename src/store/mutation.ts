import { MutationTree } from 'vuex'
import { RootStateTypes } from '@/store/types'
import { Singer } from '@/api/singer-service'
import { PlayMode } from '@/store/cache-service'

const mutations: MutationTree<RootStateTypes> = {
  SET_SINGER(state: RootStateTypes, data: Singer) {
    state.singer = data
  },
  SET_FULL_SCREEN(state: RootStateTypes, data: boolean) {
    state.fullScreen = data
  },
  SET_PLAYING_STATE(state: RootStateTypes, data: boolean) {
    state.playing = data
  },
  SET_PLAYLIST(state: RootStateTypes, data: any[]) {
    state.playList = data
  },
  SET_PLAY_MODE(state: RootStateTypes, data: PlayMode) {
    state.mode = data
  },
  SET_CURRENT_INDEX(state: RootStateTypes, data: number) {
    state.currentIndex = data
  },
  SET_SEQUENCE_LIST(state: RootStateTypes, data: any[]) {
    state.sequenceList = data
  }
}

export default mutations
