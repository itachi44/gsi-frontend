<template>
  <div id="app">
    <section v-if="isAuthenticated === false && isPwdResetPage===false">
      <Login />
    </section>

    <section v-if="isAuthenticated === true">
      <SideBar :user="user" />
      <div class="boxSize"></div>
      <div
        class="is-loading-bar has-text-centered"
        v-bind:class="{'is-loading': $store.state.isLoading }"
      >
        <div style="margin-left:45%" class="lds-dual-ring"></div>
      </div>

      <router-view v-if="user" :user="user"></router-view>
    </section>
    <section v-if="isPwdResetPage === true">
      <ResetPassword />
    </section>
  </div>
</template>


<script>
import SideBar from "@/components/SideBar.vue";
import Login from "@/views/Login.vue";
import ResetPassword from "@/views/Password_reset.vue";

import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    SideBar,
    Login,
    ResetPassword
  },
  data() {
    return {
      timer: null
    };
  },

  beforeCreate() {
    //récupérer les données du local storage avant la création de l'applicaton
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  mounted() {
    document.title = "ENT-GSI";
    //verifier le token chaque minute
    this.timer = window.setInterval(() => {
      if (this.token) {
        const formData = {
          token: this.token
        };

        this.axios
          .post("/api/verify_token/", formData)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            alert("session expiré veuillez vous reconnecter");
            axios.defaults.headers.common["Authorization"] = "";
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userid");
            localStorage.removeItem("expires_in");
            localStorage.removeItem("created_at");
            this.$store.commit("removeToken");
            this.$store.commit("removeUser");
            this.$router.push("/login");
            console.log(JSON.stringify(error));
          });
      }
    }, 10000);
  },
  //gérer le changement de l'objet user
  watch: {
    user: {
      handler(user) {
        console.log("user changed");
        console.log(user);
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated",
      user: "user",
      expires_in: "expires_in",
      created_at: "created_at",
      token: "token",
      isPwdResetPage: "isPwdResetPage"
    })
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {}
};
</script>
<style  >
.boxSize {
  margin-top: 6%;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.is-loading-bar.is-loading {
  height: 80px;
}
</style>
