import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Programme from '../views/Programme.vue'
import Planning from '../views/Planning.vue'
import Immersion from '../views/Immersion.vue'
import Messagerie from '../views/Messagerie.vue'
import LogIn from '../views/Login.vue'
import Password_reset from '../views/Password_reset.vue'
import NotFound from '../views/NotFound.vue'


import store from '../store/index.js'



Vue.use(VueRouter)
let token = localStorage.getItem("token");

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: () => {
      console.log(store.state.isAuthenticated);
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
    path: '/reset_password/:uidb/:key',
    name: 'reset_password',
    component: Password_reset,
    beforeEnter: () => {
      store.commit("setIsPwdResetPage", true);
    },
    beforeRouteLeave() {
      store.commit("setIsPwdResetPage", false);
    }
  },
  {
    path: '/Immersion',
    name: 'Immersion',
    component: Immersion,
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn,
    beforeEnter: () => {
      store.commit("setIsPwdResetPage", false);
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path);
  if (to.path === "/" && token !== null) {
    next("/Accueil");

  } else if (to.path === "/" && token === null) {
    next("/login");
  }
  if (to.path === "/login" && token !== null) {
    next("/Accueil");
  }
  // eslint-disable-next-line
  if (to.path === "/reset_password/" && token === null) {
    if (to.query) {
      console.log(to.query);
      router.push({ name: "reset_password", params: { uidb: to.query.uidb, key: to.query.key } });
    }
  }
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'login', query: { to: to.path } });
  } else {
    next()
  }
})



export default router
