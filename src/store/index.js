import Vue from "vue";
import Vuex from "vuex";
import decode from 'jwt-decode'

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    current_user: '',
    error: ''
  },
  mutations: {
    new_user (state, payload) {
      state.token = payload
      if (payload === '') {
        state.current_user = ''
      } else {
        state.current_user = decode(payload)
        router.push({ name: 'inicio' })
      }
    }
  },
  actions: {
    save_session ({ commit }, payload) {
      localStorage.setItem('token', payload)
      commit('new_user', payload)
    },
    destroy_session ({ commit }) {
      commit('new_user', '')
      localStorage.removeItem('token')
      router.push({ name: 'login' })
    },
    read_session ({ commit }) {
      const token = localStorage.getItem('token')
      if (token) {
        commit('new_user', token)
      } else {
        commit('new_user', '')
      }
    }
  },
  modules: {
  },
  getters: {
    user_exists: state => !!state.token
  }
})