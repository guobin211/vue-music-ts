import { commonParams, OPTIONS } from '@/api/config'
import { httpService, jsonpGet } from '@/api/http-service'

/**
 * 轮播图
 */
export function getRecommend() {
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
export function getDiscList(): Promise<any> {
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
