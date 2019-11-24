import { RootStateTypes } from '@/store/types'
import { PlayMode } from '@/store/cache-service'

const state: RootStateTypes = {
  singer: undefined,
  fullScreen: false,
  playing: false,
  playList: [],
  sequenceList: [],
  mode: PlayMode.SEQUENCE,
  currentIndex: -1
}

export default state
