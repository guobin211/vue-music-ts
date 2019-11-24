import { Base64 } from 'js-base64'
import { commonParams, RESPONSE } from '@/api/config'
import { httpService } from '@/api/http-service'
import { filterSinger } from '@/api/singer-service'

/**
 * 创建 Song
 * @param musicData
 */
export function createSong(musicData: any): Song {
  return new Song(
    musicData.songid,
    musicData.songmid,
    filterSinger(musicData.singer),
    musicData.songname,
    musicData.albumname,
    musicData.interval,
    `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  )
}

export function getLyric(mid: string) {
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  return httpService
    .get(url, {
      params: data
    })
    .then(res => {
      return res as any
    })
}

export class Song {
  lyric?: string
  constructor(
    public id: string,
    public mid: string,
    public singer: any,
    public name: string,
    public album: string,
    public duration: number,
    public image: string,
    public url: string
  ) {}

  public getLyric(): Promise<string> {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.code === RESPONSE.ERROR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}
