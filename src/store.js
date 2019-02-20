import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state: {
    title: 'Skill IQ',
    dark: true,
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
    updateDark (state, value) {

      state.dark = value

    },
    updateTitle (state, value) {

      state.title = value

    },
    updatePrimaryDrawerModel (state, value) {

      state.primaryDrawer.model = value

    },
    updatePrimaryDrawerType (state, value) {

      state.primaryDrawer.type = value

    },
    updatePrimaryDrawerClipped (state, value) {

      state.primaryDrawer.clipped = value

    },
    updatePrimaryDrawerFloating (state, value) {

      state.primaryDrawer.floating = value

    },
    updatePrimaryDrawerMini (state, value) {

      state.primaryDrawer.mini = value

    },
    updateFooterInset (state, value) {

      state.footer.inset = value

    }

  },
  actions: {

  }
})
