import { GetterTree } from 'vuex'
import { RootStateTypes } from '@/store/types'

const getters: GetterTree<RootStateTypes, any> = {
  singer: state => state.singer
}

export default getters
