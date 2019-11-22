export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
};

export const OPTIONS = {
  param: 'jsonpCallback'
};

// response 状态码
export enum RESPONSE {
  ERROR_OK = 0,
  NOT_ALLOW = 110
}

export interface ResponseData {
  code: number;
  data: any;
}
