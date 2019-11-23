import { MutationTree } from 'vuex'
import { RootStateTypes } from '@/store/types'
import { Singer } from '@/api/singer-service'


const mutations: MutationTree<RootStateTypes> = {
  SET_SINGER(state: RootStateTypes, data: Singer) {
    state.singer = data
  }
}

export default mutations
