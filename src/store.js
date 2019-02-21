import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state: {
    title: 'Skill IQ',
    dark: true,
    toolbar: {
      dense: false,
      flat: false
    },
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false,
      dense: false

    },
    footer: {
      inset: false,
      floating: false
    }
  },
  mutations: {
    updateDark (state, value) {

      state.dark = value

    },
    updateTitle (state, value) {

      state.title = value

    },

    updateToolbarDense (state, value) {

      state.toolbar.dense = value;

    },
    updateToolbarFlat (state, value) {

      state.toolbar.flat = value;

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
    updatePrimaryDrawerDense (state, value) {

    state.primaryDrawer.dense = value

    },

    updateFooterInset (state, value) {

      state.footer.inset = value

    },
    updateFooterFloating (state, value) {

    state.footer.floating = value

    }

  },
  actions: {

  }
})
