import { commonParams, OPTIONS } from '@/api/config'
import { jsonpGet } from '@/api/http-service'

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
