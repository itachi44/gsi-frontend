import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: "",
    isLoading: false,
    userType: "",
    user: []
  },
  mutations: {
    //initialisation du local storage
    initializeStore(state) {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
        //données de l'utilisateur
        state.user = JSON.parse(localStorage.getItem("user"));

      } else {
        state.token = "";
        state.isAuthenticated = false;
        state.user = [];

      }

    },
    //pour le loadind bar
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    //souvegarder un token 
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    //supprimer un token
    removeToken(state) {
      state.token = '';
      state.isAuthenticated = false;
    },
    //sauvegarder le user
    setUser(state, user) {
      state.user = user;
    },
    //supprimer le user
    removeUser(state) {
      state.user = '';
    },
  },
  actions: {

  },
  modules: {
  }
})
