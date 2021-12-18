import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'boxicons/css/boxicons.min.css'
import Axios from 'axios'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


Vue.config.productionTip = false
Vue.use(Vuesax)
Vue.use(VueAxios, Axios)

Axios.defaults.baseURL = "http://127.0.0.1:8000"


Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalConfig = error.config;
    console.log(originalConfig);

    if (originalConfig.url !== "/api/login/" && error.response) {
      if (error.response.status === 401) {
        alert("votre session a expirée. Veuillez vous reconnecter");
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userid");
        localStorage.removeItem("expires_in");
        localStorage.removeItem("created_at");
        this.$store.commit("removeToken");
        this.$store.commit("removeUser");
        router.push("/login");
      }
    }
    //logout the user
  }
);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
