<template>
  <div id="app">
    <section v-if="loggedIn === false">
      <Login />
    </section>

    <section v-else>
      <SideBar />
      <div class="boxSize"></div>
      <div
        class="is-loading-bar has-text-centered"
        v-bind:class="{'is-loading': $store.state.isLoading }"
      >
        <div style="margin-left:45%" class="lds-dual-ring"></div>
      </div>
      <router-view></router-view>
    </section>
  </div>
</template>


<script>
import SideBar from "@/components/SideBar.vue";
import Login from "@/views/Login.vue";

import { mapState } from "vuex";
//import { toast } from "bulma-toast";

export default {
  name: "App",
  components: {
    SideBar,
    Login
  },
  computed: {
    ...mapState({
      loggedIn: "loggedIn"
    })
  },
  //récupérer les données du local storage avant la création de l'applicaton
  beforeCreate() {
    this.$store.commit("initializeStore");
  },

  mounted() {
    //  toast({
    //         message: 'Bienvenue M.*****',
    //         type: 'is-success',
    //         dismissible: true,
    //         pauseOnHover: true,
    //         duration: 2000,
    //         position: 'bottom-right',
    //     })
  }
};
</script>
<style  >
.boxSize {
  margin-top: 5%;
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
