/* tslint:disable:forin */
/**
 * http-client
 * @author guobin201314@gmail.com on 2019-04-17
 */
import JSONP from "jsonp";

class HttpClient {

  constructor() {
  }

  /**
   * jsonp get
   * @param url
   * @param data object
   * @param option
   */
  public jsonp(url: string, data: any, option: any) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + this.buildParams(data);
    return new Promise((resolve, reject) => {
      JSONP(url, option, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err)
        }
      })
    })
  }

  /**
   * 构造url
   * @param obj
   */
  private buildParams(obj: { [key: string]: string }) {
    let url = '';
    for (const k in obj) {
      const value = obj[k];
      url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
  }
}

export const http = new HttpClient();
