import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'boxicons/css/boxicons.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false
Vue.use(Vuesax)
Vue.use(VueAxios, axios)

axios.defaults.baseURL = "http://127.0.0.1:8000"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
