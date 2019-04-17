/**
 * mutations
 * @author guobin201314@gmail.com on 2019-04-16
 */

import { Author, RootStateTypes } from './types';
import { MutationTree  } from 'vuex';

const mutations: MutationTree<RootStateTypes> = {
    setAuthor(state: RootStateTypes, data: Author) {
        state.author = data;
    },
};

export default mutations;

