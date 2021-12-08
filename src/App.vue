<template>
  <div id="app">
    <section v-if="loggedIn === false">
      <Login />
    </section>

    <section v-else>
      <SideBar />
      <div class="boxSize"></div>

      <router-view></router-view>
    </section>
  </div>
</template>


<script>
import SideBar from "@/components/SideBar.vue";
import Login from "@/views/Login.vue";

import { mapState } from "vuex";

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
  }
};
</script>
<style >
.boxSize {
  margin-top: 5%;
}
</style>
