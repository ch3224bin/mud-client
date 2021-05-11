import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const requireAuth = (returnPath) => (from, to, next) => {
  const isAuthenticated = localStorage.getItem('accessToken')
  if (isAuthenticated) return next()
  next(`/login?returnPath=${returnPath}`)
}

const requireAdminAuth = (returnPath) => (from, to, next) => {
  const isAuthenticated = localStorage.getItem('accessToken')
  if (isAuthenticated) return next()
  next(`/login?returnPath=${returnPath}`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth('/')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: requireAdminAuth('admin')
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter: requireAuth('about'),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
