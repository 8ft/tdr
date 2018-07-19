import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Store = () => import('@/views/common/store/index.vue')
const Cart = () => import('@/views/common/orders/cart.vue')
const Mine = () => import('@/views/common/mine.vue')

export default new Router({
  routes: [
    
    { 
      path: '/', 
      redirect: '/store'
    },{ 
      path: '/store', 
      meta: {
        title:'商店',
        hasTabBar: true
      },
      component: Store
    },{ 
      path: '/cart', 
      meta: {
        title:'购物车',
        hasTabBar: true
      },
      component: Cart
    },{ 
      path: '/mine', 
      meta: {
        title:'我的',
        hasTabBar: true
      },
      component: Mine
    }
    
  ]
})
