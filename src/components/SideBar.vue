
// F0DBBA
// CA7900
<template>
  <div class="container">
    <div class="hidden">
      <vs-navbar shadow square center-collapsed v-model="active">
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

        <vs-input icon="search" placeholder="rechercher" v-model="searchValue" />
        <i class="bx bx-search bx-xs"></i>

        <vs-button
          style="color:#CA7900; background-color:#F0DBBA;"
          color="#F0DBBA"
          flat
          :active="active == 0"
          @click="active = 0"
        >Chercher</vs-button>
        <template #right>
          <div class="student-infos">
            <vs-button flat color="#F0DBBA" :active="active == 5" @click="active = 5">
              <span style="color:#CA7900;">Farimata Ngom</span>
            </vs-button>
            <vs-button style="background-color:#fff;" class="user-avatar">
              <i style="color:#000;" class="bx bx-user bx-sm"></i>
            </vs-button>
          </div>

          <vs-button flat color="#F0DBBA">
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
          <img src="@/assets/logo.png" />
        </template>
        <vs-sidebar-item style="color:black;" class="home" id="home">
          <template #icon>
            <i class="bx bx-home"></i>
          </template>Accueil
        </vs-sidebar-item>
        <vs-sidebar-item id="Programme">
          <template #icon>
            <i class="bx bxs-calendar"></i>
          </template>
          <router-link class="sideBar-link" to="/Programme">Programme</router-link>
        </vs-sidebar-item>
        <vs-sidebar-item id="Planning">
          <template #icon>
            <i class="bx bx-code-block"></i>
          </template>
          <router-link class="sideBar-link" to="/Planning">Planning</router-link>
        </vs-sidebar-item>
        <vs-sidebar-item id="Immersion">
          <template #icon>
            <i class="bx bx-detail"></i>
          </template>
          <router-link class="sideBar-link" to="/Immersion">Immersion</router-link>
        </vs-sidebar-item>
        <vs-sidebar-item id="Messagerie">
          <template #icon>
            <i class="bx bx-envelope bx-envelope1"></i>
          </template>
          <router-link class="sideBar-link" to="/Messagerie">Messagerie</router-link>
        </vs-sidebar-item>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right"></vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
    </div>
  </div>
</template>

  <script>
export default {
  data: () => ({
    active: "home",
    activeSidebar: false,
    searchValue: ""
  })
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

.bx-search {
  position: relative;
  right: 10%;
}

/* .home :active {
  color: #ff9900 !important;
} */

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

.bx-home,
.bxs-calendar,
.bx-detail,
.bx-envelope1,
.bx-code-block {
  color: ;
}
</style>