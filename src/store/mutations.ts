/**
 * mutations
 * 都是 sync操作
 * @author guobin201314@gmail.com on 2019-04-16
 */

import { Author, RootStateTypes } from './types';
import { MutationTree  } from 'vuex';

const mutations: MutationTree<RootStateTypes> = {
    setAuthor(state: RootStateTypes, data: Author) {
        copyObjectValues(data, state.author)
    },
};

export default mutations;

/**
 * object 赋值
 * @param obj
 * @param target
 */
function copyObjectValues(obj: any, target: any) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        target[key] = obj[key];
    }
}
