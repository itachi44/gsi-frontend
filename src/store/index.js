import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: "",
    isLoading: false
  },
  mutations: {
    //initialisation du local storage
    initializeStore(state) {
      if (localStorage.getItem("token")) {
        state.token = JSON.parse(localStorage.getItem("token"));

      } else {

        localStorage.setItem("token", JSON.stringify(state.token));

      }

    },

    //pour le loadind bar

    setIsLoading(state, status) {
      state.isLoading = status;

    }
  },
  actions: {
  },
  modules: {
  }
})
