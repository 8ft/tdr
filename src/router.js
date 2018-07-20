import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Goods = () => import('@/views/common/goods/index.vue')
const Cart = () => import('@/views/common/orders/cart.vue')
const Mine = () => import('@/views/common/mine.vue')

const GoodsDetail = () => import('@/views/common/goods/detail.vue')

export default new Router({
  routes: [
    
    { 
      path: '/', 
      redirect: '/goods'
    },{ 
      path: '/goods', 
      meta: {
        title:'商店',
        hasTabBar: true
      },
      component: Goods
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
    },{ 
      path: '/goods/:id', 
      meta: {
        title:'商品详情'
      },
      component: GoodsDetail
    }
    
  ]
})
