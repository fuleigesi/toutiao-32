import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/auth'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('HEIMA-TOUTIAO-TOKEN')) || {}
    tokenObj: getItem() || {}
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      //   localStorage.setItem('HEIMA-TOUTIAO-TOKEN', JSON.stringify(payload))
      setItem(payload)
    }
  }
})
