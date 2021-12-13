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
      <div class="form">
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
          <vs-checkbox color="#CA7900" v-model="checkBox">Se souvenir de moi ?</vs-checkbox>
          <router-link
            to="/"
            style="text-decoration:none; color:#CA7900; margin-top:2%; margin-left:20%; font-size:0.9em;"
          >Mot de passe oublié ?</router-link>
        </div>
        <br />
        <br />
        <vs-button
          @click="logIn()"
          ref="button"
          style="color:#CA7900; background-color:#CA7900; width:70%; border-radius:4%; transform:scale(1.2);"
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
      </div>
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
    checkBox: "",
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
      console.log(formData);
      //appel de l'api
      await this.axios
        .post("/api/login/", formData)
        .then(response => {
          console.log(response.data);
          const token = response.data.token;
          this.$store.commit("setToken", token);

          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          this.$store.state.isAuthenticated = true;

          //redirection vers la page accueil
          console.log(this.$route.query.to || "/");
          // const toPath = this.$route.query.to || "/";
          // this.$router.push(toPath);
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
          //  toast({
          //         message: '',
          //         type: 'is-danger',
          //         dismissible: true,
          //         pauseOnHover: true,
          //         duration: 2000,
          //         position: 'bottom-right',
          //     })
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
  width: 60%;
  margin-bottom: 10%;
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
}
</style>
