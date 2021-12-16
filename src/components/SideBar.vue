<template>
  <div class="hidden">
    <vs-navbar
      style="height:9%;display:flex;"
      class="navb"
      shadow
      square
      center-collapsed
      v-model="active"
    >
      <template #left>
        <vs-button
          style="color:black; background-color:#fff;"
          @click="activeSidebar = !activeSidebar"
          flat
          icon
        >
          <i class="bx bx-menu bx-sm"></i>
        </vs-button>
      </template>
      <img style=" transform:scale(0.5);" src="@/assets/logo.svg" />
      <span
        style="font-size:1.5em; color:#000; font-family:Arial Narrow, sans-serif;"
      >ENT gestion et suivi des immersions</span>
      <template #right>
        <div class="student-infos">
          <vs-button flat color="#F0DBBA" :active="active == 5" @click="active = 5">
            <span
              style="color:#CA7900;"
              v-if="user.membre"
            >{{user.membre.prenom}} {{user.membre.nom}}</span>
          </vs-button>
          <vs-button style="background-color:#fff;" class="user-avatar">
            <i style="color:#000;" class="bx bx-user bx-sm"></i>
          </vs-button>
        </div>

        <vs-button class="logoutBtn" @click="logout()" flat color="#F0DBBA">
          <span style="color:#CA7900;">Deconnexion</span>
        </vs-button>
        <vs-button style="background-color:#fff;">
          <i style="color:#000;" class="bx bx-bell bx-sm"></i>
        </vs-button>
        <vs-button style="background-color:#fff;">
          <i style="color:#000;" class="bx bx-envelope bx-sm"></i>
        </vs-button>
      </template>
    </vs-navbar>
    <vs-sidebar absolute v-model="active" :open.sync="activeSidebar">
      <template #logo>
        <img src="@/assets/logo.svg" />
      </template>
      <vs-sidebar-item to="/Accueil" class="home" id="home">
        <template #icon>
          <i class="bx bx-home"></i>
        </template>Accueil
      </vs-sidebar-item>
      <vs-sidebar-item to="/Programme" id="Programme">
        <template #icon>
          <i class="bx bxs-calendar"></i>
        </template>
        Programme
      </vs-sidebar-item>
      <vs-sidebar-item to="/Planning" id="Planning">
        <template #icon>
          <i class="bx bx-code-block"></i>
        </template>
        Planning
      </vs-sidebar-item>
      <vs-sidebar-item to="/Immersion" id="Immersion">
        <template #icon>
          <i class="bx bx-detail"></i>
        </template>
        Immersion
      </vs-sidebar-item>
      <vs-sidebar-item to="/Messagerie" id="Messagerie">
        <template #icon>
          <i class="bx bx-envelope bx-envelope1"></i>
        </template>
        Messagerie
      </vs-sidebar-item>
      <template #footer>
        <vs-row justify="space-between"></vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

  <script>
import axios from "axios";

export default {
  props: {
    user: {
      type: []
    }
  },
  data: () => ({
    active: "home",
    activeSidebar: false
  }),
  methods: {
    async logout() {
      const toPath = this.$route.query.to || "/";
      this.$router.push(toPath).catch(() => {});
      await this.axios
        .post("/api/logout/", this.$store.state.token)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("userid");
          this.$store.commit("removeToken");
          this.$store.commit("removeUser");
          console.log(response.data);
        });
    }
  }
};
</script>


<style>
.sideBar-link {
  text-decoration: none;
  color: black;
}

.student-infos {
  margin-top: 1%;
  display: flex;
  flex-direction: row;
  margin-right: 5%;
}

.user-avatar {
  transform: scale(0.8);
}

.vs-sidebar__item:after {
  background-color: #ff9900 !important;
}

.bx-home,
.bxs-calendar,
.bx-detail,
.bx-envelope1,
.bx-code-block {
  color: #000;
}

.logoutBtn:active {
  transform: scale(0.95);
  background-color: #ca7900;
}
</style>