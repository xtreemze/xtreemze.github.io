import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    dark: true,
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false

    },
    footer: {
      inset: false
    }
  },
  mutations: {
    changeDarkness (state, dark) {
      state.dark = dark
    }
  },
  getters: {
    dark: state => state.dark
  }
})
