import { jsonpGet } from '@/api/http-service'
import { commonParams, OPTIONS, ResponseData } from '@/api/config'

export interface SongItem {
  songname: string
  singername: string
}

export interface TopItem {
  id: number
  listenCount: number
  picUrl: string
  songList: SongItem[]
  topTitle: string
  type: number
}

/**
 * 排行榜单
 */
export function getTopList(): Promise<ResponseData<any>> {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonpGet(url, data, OPTIONS)
}

/**
 * 榜单歌曲列表
 * @param topid
 */
export function getMusicList(topid: string): Promise<ResponseData<any>> {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonpGet(url, data, OPTIONS)
}
