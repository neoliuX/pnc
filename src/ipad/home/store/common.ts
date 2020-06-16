import { StoreOptions } from 'vuex/types/index.d'
import { State } from 'vuex-class'

const Common: StoreOptions<any> = {
  state: {
    isHeadDemoShow: { // 公共头部那些内容显示或不显示
      logo: true,
      mark: true
    }
  },
  mutations: {
    setHeadDemoShow (state, data) {
      state.isHeadDemoShow = data
    }
  },
  actions: {
  }
}

export default Common
