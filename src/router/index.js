import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Goods from '../view/goods/goods.vue'
import Ratings from '../view/ratings/ratings.vue'
import Seller from '../view/seller/seller.vue'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(Vuex)


export default new Router({
  routes: [
    {
      path: '*', 
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
  ]
})
