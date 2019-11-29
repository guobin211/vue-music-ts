import { Singer } from '@/api/singer-service'
import { PlayMode } from '@/store/cache-service'

export interface RootStateTypes {
  // 当前歌手
  singer: Singer | undefined,
  // 播放暂停
  playing: boolean,
  // 全屏
  fullScreen: boolean,
  // 播放列表
  playList: any[],
  // 顺序列表
  sequenceList: any[],
  // 播放模式
  mode: PlayMode,
  // 当前播放歌曲序号
  currentIndex: number,
}
