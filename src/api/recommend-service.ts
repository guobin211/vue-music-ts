import { commonParams, OPTIONS, ResponseData } from '@/api/config'
import { httpService, jsonpGet } from '@/api/http-service'

export interface RadioItem {
  Ftitle: string
  picUrl: string
  radioid: number
}

export interface SliderItem {
  id: number
  linkUrl: string
  picUrl: string
}

export interface SongItem {
  accessnum: number
  album_pic_mid: string
  id: string
  picUrl: string
  pic_mid: string
  songListAuthor: string
  songListDesc: string
}

export interface RecommendResp {
  radioList: RadioItem[]
  slider: SliderItem[]
  songList: SongItem[]
}

export interface Creator {
  avatarUrl: string
  encrypt_uin: string
  followflag: number
  isVip: number
  name: string
  qq: number
  type: number
}

export interface DiscItem {
  creator: Creator
  dissid: string
  dissname: string
  imgurl: string
  introduction: string
  listennum: number
  score: number
  version: number
}

export interface DiscResp {
  categoryId: number
  ein: number
  list: DiscItem[]
  sin: number
  sortId: number
  sum: number
  uin: number
}

/**
 * 轮播图
 */
export function getRecommend(): Promise<ResponseData<RecommendResp>> {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonpGet(url, data, OPTIONS)
}

/**
 * 热门歌单列表
 */
export function getDiscList(): Promise<ResponseData<DiscResp>> {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return httpService.get(url, {
    params: data
  })
}
