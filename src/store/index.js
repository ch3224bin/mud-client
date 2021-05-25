import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: JSON.parse(sessionStorage.getItem('currentUser')) || {}
  },
  mutations: {
    SET_USER (state, payload) {
      state.currentUser = payload
      sessionStorage.setItem('currentUser', JSON.stringify(payload))
    }
  },
  actions: {
    fetchUser ({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.axios.get('/me').then(({ data }) => {
          commit('SET_USER', data)
          resolve(data)
        }, error => reject(error))
      })
    },
    logout ({ commit }) {
      commit('SET_USER', {})
      // document.cookie = "backend-session" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
  },
  getters: {
    isAuthenticated: (state) => {
      return state.currentUser.name
    }
  }
})
