import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: "",
    isLoading: false,
    userType: "",
    user: Object
  },
  mutations: {
    //initialisation du local storage
    initializeStore(state) {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;

      } else {
        state.token = "";
        state.isAuthenticated = false;

      }

    },
    //pour le loadind bar
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    //souvegarder un token 
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    //supprimer un token
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
  },
  actions: {

  },
  modules: {
  }
})
