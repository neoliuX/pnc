import Vue from 'vue'
import Vuex from 'vuex'
import Common from './Common'

Vue.use(Vuex)
const store: any = new Vuex.Store({
  modules: {
    common: Common
  }
})
export default store
