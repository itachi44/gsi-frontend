<template>
  <div class="content">
    <div class="image">
      <img src="@/assets/onboarding.jpg" />
    </div>

    <div class="loginForm">
      <div class="header">
        <img src="@/assets/logo.svg" />
      </div>
      <p class="headerText">Connectez-vous à votre compte</p>
      <br />

      <form @submit.prevent="logIn" class="inputs">
        <vs-input
          size="large"
          class="formInput"
          color="#F0DBBA"
          v-model="identifiant"
          placeholder="exemple@gmail.com"
        />
        <br />
        <br />
        <vs-input
          size="large"
          class="formInput"
          color="#F0DBBA"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <br />
        <br />
        <div class="stuffs">
          <router-link
            to="/"
            style="text-decoration:none; color:#CA7900; margin-top:2%; margin-left:10%; font-size:0.9em;"
          >Mot de passe oublié ?</router-link>
        </div>
        <br />
        <br />
        <vs-button
          button="submit"
          ref="button"
          style="margin-left:15%; color:#CA7900; background-color:#CA7900; width:65%; border-radius:4%; transform:scale(1.2);"
          color="#CA7900"
          flat
        >
          <span style="color:#fff;">Connexion</span>
        </vs-button>
        <br />
        <!-- gestion des erreurs -->
        <div class="alert alert-danger" v-if="errors.length">
          <span v-for="error in errors" v-bind:key="error">{{ error }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  components: {},
  data: () => ({
    password: "",
    identifiant: "",
    errors: []
  }),
  methods: {
    async logIn() {
      this.openLoadingButton();
      //reset errors
      this.errors = [];
      //affichage de la barre de chargement
      this.$store.commit("setIsLoading", true);
      //reset Authorization header
      axios.defaults.headers.common["Authorization"] = "";
      //suppression du Token
      localStorage.removeItem("token");

      //les données
      const formData = {
        identifiant: this.identifiant,
        mot_de_passe: this.password
      };
      //appel de l'api
      await this.axios
        .post("/api/login/", formData)
        .then(response => {
          const token = response.data.token;
          this.$store.commit("setToken", token);
          console.log(response.data);

          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);

          //redirection vers la page accueil
          const toPath = this.$route.query.to || "/";
          this.$router.push(toPath);
          //aafichage d'un message de bienvenue
          this.$vs.notification({
            color: "success",
            position: "bottom-left",
            title: "Bienvenue",
            text: "",
            buttonClose: false
          });
        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            this.errors.push(
              "Quelque chose ne marche pas. Veuillez réessayer encore."
            );

            console.log(JSON.stringify(error));
          }
        });

      //se souvenir de lui?
      //enlever la barre de chargement
      this.$store.commit("setIsLoading", false);
    },
    openLoadingButton() {
      const loading = this.$vs.loading({
        target: this.$refs.button,
        scale: "0.6",
        background: "#CA7900",
        opacity: 1,
        color: "#fff"
      });
      setTimeout(() => {
        loading.close();
      }, 1500);
    }
  }
};
</script>

<style scoped>
body,
html {
  padding: 0;
  margin: 0;
}
.content {
  display: flex;
  flex-direction: row;
}
.image {
  width: 55%;
  margin-bottom: 10%;
}

.inputs {
  width: 80%;
}
.loginForm {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  height: 20%;
}

.header {
  transform: scale(0.8);
  margin-top: 10%;
}

.headerText {
  margin-right: 3%;
  font-size: 1.3em;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.stuffs {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.formInput {
  transform: scale(1.4);
  font-size: 0.7em;
  margin-left: 28%;
}

@media screen and (max-width: 1200px) {
  .image {
    display: none;
  }
}
</style>
