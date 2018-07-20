import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layoutChanged:0
  },
  mutations: {
    changeLayout(state){
      state.layoutChanged++;
    }
  },
  actions: {

  }
})
