import Vue from 'vue'
import Router from 'vue-router'
import Interface from './views/Interface.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/interface',
      name: 'interface',
      component: Interface
    },
    {
      path: '/',
      name: 'skills',
      component: () => import(/* webpackChunkName: "skills" */ './views/Skills.vue')
    }
  ]
})
