import { GetterTree } from 'vuex'
import { RootStateTypes } from '@/store/types'

const getters: GetterTree<RootStateTypes, any> = {
  singer: state => state.singer,
  fullScreen: state => state.fullScreen,
  playing: state => state.playing,
  playList: state => state.playList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  sequenceList: state => state.sequenceList,
  currentSong: state => state.playList[state.currentIndex]
}

export default getters
