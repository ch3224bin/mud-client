import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null
  },
  mutations: {
    LOGIN (state, accessToken) {
      state.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    LOGOUT (state) {
      state.accessToken = null
      delete localStorage.accessToken
    }
  },
  actions: {
    LOGIN ({ commit }, params) {
      return Vue.axios
        .post('/login', params)
        .then(({ data }) => {
          commit('LOGIN', data)
          Vue.axios.defaults.headers.common['X-AUTH-TOKEN'] = data
        })
    },
    LOGOUT ({ commit }) {
      Vue.axios.defaults.headers.common['X-AUTH-TOKEN'] = undefined
      commit('LOGOUT')
    }
  },
  modules: {
  }
})
