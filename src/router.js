import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/interface',
      name: 'interface',
      component: () => import(/* webpackChunkName: "interface" */ './views/Interface.vue')
    },
    {
      path: '/',
      name: 'skills',
      component: () => import(/* webpackChunkName: "skills" */ './views/Skills.vue')
    },
    {
      path: '/employment',
      name: 'employment',
      component: () => import(/* webpackChunkName: "employment" */ './views/Employment.vue')
    }
  ]
})
