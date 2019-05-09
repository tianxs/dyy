import Vue from 'vue'
import Router from 'vue-router'
const productIndex = resolve => require(['@/pages/product/productIndex'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'product.index',
      component: productIndex
    }
  ]
})
