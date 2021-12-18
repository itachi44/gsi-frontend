import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Programme from '../views/Programme.vue'
import Planning from '../views/Planning.vue'
import Immersion from '../views/Immersion.vue'
import Messagerie from '../views/Messagerie.vue'
import LogIn from '../views/Login.vue'
import Password_reset from '../views/Password_reset.vue'

import store from '../store/index.js'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: () => {
      if (store.state.isAuthenticated === true) {
        return Home
      } else {
        return LogIn
      }
    }
  },
  {
    path: '/Accueil',
    name: 'Home',
    component: Home,

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
    component: Messagerie,

  },
  {
    path: '/reset_password',
    name: 'reset_password',
    component: Password_reset
  },
  //:uidb/:key'
  {
    path: '/Immersion',
    name: 'Immersion',
    component: Immersion,

  },
  {
    path: '/login',
    name: 'login',
    component: LogIn,

  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  console.log(token);
  if (to.path === "/" && token !== null) {
    router.push("/Accueil").catch(() => { });

  }
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'login', query: { to: to.path } });
  } else {
    next()
  }
})

export default router
