import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Programme from '../views/Programme.vue'
import Planning from '../views/Planning.vue'
import Immersion from '../views/Immersion.vue'
import Messagerie from '../views/Messagerie.vue'
import Login from '../views/Login.vue'
import store from '../store/index.js'





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => {
      if (store.state.isAuthenticated === true) {
        console.log(store.state.isAuthenticated)
        return Home
      } else {
        return Login
      }
    }
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

export default router
