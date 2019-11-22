import JSONP from 'jsonp'
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

/**
 * params
 * @param obj
 */
export function buildParams(obj: { [key: string]: string }): string {
  let url = ''
  for (const k in obj) {
    const value = obj[k]
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

/**
 * jsonp request
 * @param url
 * @param data
 * @param option
 */
export function jsonpGet(url: string, data: any, option: any): Promise<any> {
  url += (url.indexOf('?') < 0 ? '?' : '&') + buildParams(data)
  return new Promise((resolve, reject) => {
    JSONP(url, option, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

export const httpService: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 15000
})

httpService.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  error => {
    console.error('httpService.interceptors.request: ', error)
    return error
  }
)

httpService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  error => {
    console.error('httpService.interceptors.response: ', error)
    return error
  }
)

