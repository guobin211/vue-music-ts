/**
 * 播放模式
 */
export enum PlayMode {
  // 歌单
  SEQUENCE = 0,
  // 循环
  LOOP = 1,
  // 随机
  RANDOM = 2
}


export enum StorageKey {
  SEARCH_KET = '__search__',
  PLAY_KEY = '__play__',
  FAVORITE_KEY = '__favorite__'
}

export function loadSearch() {
  return cacheService.getItem(StorageKey.SEARCH_KET, [])
}

export function loadPlay() {
  return cacheService.getItem(StorageKey.PLAY_KEY, [])
}

export function loadFavorite() {
  return cacheService.getItem(StorageKey.FAVORITE_KEY, [])
}

class CacheService {

  getItem(key: StorageKey, resp: object): object {
     const data = localStorage.getItem(key)
     return data ? JSON.parse(data) : resp
   }

  setItem(key: StorageKey, data: object) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  remove(key: StorageKey) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

export const cacheService = new CacheService();
