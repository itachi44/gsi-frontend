<template>
  <div class="container">
    <div class="hidden">
      <vs-navbar shadow square center-collapsed v-model="active">
        <template #left>
          <vs-button @click="activeSidebar = !activeSidebar" flat icon>
            <i class="bx bx-menu"></i>
          </vs-button>
        </template>
        <!-- search bar here -->
        <vs-navbar-item :active="active == 'components'" id="components">search bar</vs-navbar-item>
        <template #right>
          <div class="student-infos">
            <div class="bloc1">
              <vs-button flat>
                <span>name</span>
              </vs-button>
            </div>
            <div class="bloc2">
              <!-- image here -->
            </div>
          </div>

          <vs-button flat>Deconnexion</vs-button>
          <vs-button>
            <i class="bx bx-bell"></i>
          </vs-button>
          <vs-button>
            <i class="bx bx-envelope"></i>
          </vs-button>
        </template>
      </vs-navbar>
      <vs-sidebar absolute v-model="active" :open.sync="activeSidebar">
        <template #logo>
          <!-- ...img logo -->
        </template>
        <vs-sidebar-item id="home">
          <template #icon>
            <i class="bx bx-home"></i>
          </template>Accueil
        </vs-sidebar-item>
        <vs-sidebar-item id="donate">
          <template #icon>
            <i class="bx bxs-calendar"></i>
          </template>
          <router-link class="sideBar-link" to="/Programme">Programme</router-link>
        </vs-sidebar-item>
        <vs-sidebar-item id="drink">
          <template #icon>
            <i class="bx bx-detail"></i>
          </template>
          <router-link class="sideBar-link" to="/Planning">Planning</router-link>
        </vs-sidebar-item>
        <vs-sidebar-item id="shopping">
          <template #icon>
            <i class="bx bxs-detail"></i>
          </template>
          <router-link class="sideBar-link" to="/Immersion">Immersion</router-link>
        </vs-sidebar-item>
        <vs-sidebar-item id="chat">
          <template #icon>
            <i class="bx bx-envelope"></i>
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
    activeSidebar: false
  })
};
</script>


<style>
.sideBar-link {
  text-decoration: none;
  color: black;
}
</style>