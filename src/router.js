import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/interface',
      name: 'interface',
      component: () => {return import(/* webpackChunkName: "interface" */ './views/Interface.vue')},
    },
    {
      path: '/',
      name: 'skills',
      component: () => {return import(/* webpackChunkName: "skills" */ './views/Skills.vue')},
    },
    {
      path: '/employment',
      name: 'employment',
      component: () => {return import(/* webpackChunkName: "employment" */ './views/Employment.vue')},
    },
  ],
})
