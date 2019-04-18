import { commonParams, OPTIONS } from "@/config/config";
import { http } from "@/service/http-client";
import axios from 'axios';

class DataService {

    constructor() {
    }

    /**
     * recommend.vue
     */
    public getRecommend(): Promise<any> {
        const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
        const data = Object.assign({}, commonParams, {
            platform: 'h5',
            uin: 0,
            needNewCode: 1
        });
        return http.jsonp(url, data, OPTIONS)
    }

    public getDiscList(): Promise<any> {
        const url = '/api/getDiscList';

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
        });

        return axios.get(url, {
            params: data
        }).then((res: any) => {
            return Promise.resolve(res.data)
        })
    }

    public getSongList(disstid: any): Promise<any> {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

        const data = Object.assign({}, commonParams, {
            disstid,
            type: 1,
            json: 1,
            utf8: 1,
            onlysong: 0,
            platform: 'yqq',
            hostUin: 0,
            needNewCode: 0
        });

        return http.jsonp(url, data, OPTIONS)
    }
}

export const dataService = new DataService();

