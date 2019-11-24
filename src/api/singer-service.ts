import { commonParams, OPTIONS, ResponseData } from '@/api/config'
import { jsonpGet } from '@/api/http-service'

export interface SingerGroup {
  title: string
  items: Singer[]
}

export class Singer {
  avatar: string
  constructor(public id: string, public name: string) {
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

/**
 * 获取歌手列表
 */
export function getSingerList(): Promise<any> {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonpGet(url, data, OPTIONS)
}

/**
 * 歌手详情
 * @param singerId
 */
export function getSingerDetail(singerId: string): Promise<ResponseData<any>> {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })
  return jsonpGet(url, data, OPTIONS)
}

export function filterSinger(singer: any) {
  let ret: any[] = []
  if (!singer) {
    return ''
  }
  singer.forEach((s: any) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
