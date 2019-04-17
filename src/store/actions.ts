/**
 * actions
 * 都是 promise 操作
 * @author guobin201314@gmail.com on 2019-04-16
 */

import { Author, RootStateTypes } from './types';
import { ActionTree } from 'vuex';

const actions: ActionTree<RootStateTypes, any> = {
    setAuthorAsync({ commit, state}, data: Author) {
        commit('setAuthor', data);
    },
};

export default actions;
