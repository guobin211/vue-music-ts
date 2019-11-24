import { Singer } from '@/api/singer-service'
import { PlayMode } from '@/store/cache-service'

export interface RootStateTypes {
  singer: Singer | undefined,
  playing: boolean,
  fullScreen: boolean,
  playList: any[],
  // 顺序列表
  sequenceList: any[],
  mode: PlayMode,
  currentIndex: number,
}
