<template>
  <div id="app">
    <section v-if="loggedIn === false">
      <Login />
    </section>

    <section v-else>
      <SideBar />
      <br />
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
  }
};
</script>
<style >
</style>
