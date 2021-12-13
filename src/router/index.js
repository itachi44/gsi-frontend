import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Programme from '../views/Programme.vue'
import Planning from '../views/Planning.vue'
import Immersion from '../views/Immersion.vue'
import Messagerie from '../views/Messagerie.vue'
import LogIn from '../views/Login.vue'
import store from '../store/index.js'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => {
      if (store.state.isAuthenticated === true) {
        return Home
      } else {
        return LogIn
      }
    }
  },
  {
    path: '/logIn',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/Programme',
    name: 'Programme',
    component: Programme
  },
  {
    path: '/Planning',
    name: 'Planning',
    component: Planning
  },

  {
    path: '/Messagerie',
    name: 'Messagerie',
    component: Messagerie
  },

  {
    path: '/Immersion',
    name: 'Immersion',
    component: Immersion
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})

export default router
