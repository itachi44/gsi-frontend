<template>
  <div class="content">
    <!-- modal -->

    <div
      class="modal fade"
      id="resetPasswordModal"
      ref="resetPasswordModal"
      tabindex="-1"
      aria-labelledby="resetPasswordModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="resetPasswordModalLabel">Reinitialiser votre mot de passe</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="identifiant" class="col-form-label">entrer votre adresse email:</label>
                <input v-model="recovery_email" type="text" class="form-control" id="identifiant" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button
              @click="passwordReset()"
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-primary"
            >Envoyer</button>
          </div>
        </div>
      </div>
    </div>
    <!-- fin modal -->

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
            data-bs-toggle="modal"
            data-bs-target="#resetPasswordModal"
            data-bs-whatever="@mdo"
            to="/reset_password"
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
        <div ref="errors" class="alert alert-danger" v-if="errors.length">
          <span v-for="(error,i) in errors" v-bind:key="i">{{ error }}</span>
        </div>

        <div
          ref="messages"
          style="margin-top:2%;"
          class="alert alert-success"
          v-if="messages.length"
        >
          <span v-for="(msg,i) in messages" v-bind:key="i">{{ msg }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  components: {},
  data: () => ({
    password: "",
    identifiant: "",
    errors: [],
    recovery_email: "",
    messages: []
  }),
  watch: {
    errors: {
      handler(errors) {
        console.log(errors);
        if (errors) {
          setTimeout(() => (this.$refs["errors"].style.display = "none"), 3000);
        }
      },
      deep: true
    },
    messages: {
      handler(messages) {
        if (messages) {
          setTimeout(
            () => (this.$refs["messages"].style.display = "none"),
            3000
          );
        }
      },
      deep: true
    }
  },
  methods: {
    async logIn() {
      this.openLoadingButton();
      this.errors = [];
      this.$store.commit("setIsLoading", true);
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expires_in");
      localStorage.removeItem("created_at");

      const formData = {
        identifiant: this.identifiant,
        mot_de_passe: this.password
      };

      await this.axios
        .post("/api/login/", formData)
        .then(response => {
          const token = response.data.token;
          this.$store.commit("setToken", token);
          this.$store.state.userType = response.data.userType;
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);

          let prenom;
          let message;

          //récupération des infos du user
          if (this.$store.state.userType == "is_student") {
            this.axios
              .get("/api/etudiant/?email=" + response.data.user.email)
              .then(response => {
                var userData = JSON.parse(
                  JSON.stringify(response.data.results[0])
                );
                prenom = userData.membre["prenom"];
                message = "Bienvenue " + prenom;
                //enregistrement de l'utilisateur
                localStorage.setItem("user", JSON.stringify(userData));
                this.$store.commit("setUser", userData);
                //redirection vers la page accueil
                const toPath = this.$route.query.to || "/Accueil";
                this.$router.push(toPath).catch(() => {});
                //affichage d'un message de bienvenue
                this.$vs.notification({
                  color: "success",
                  position: "bottom-left",
                  title: message,
                  text: "",
                  buttonClose: false
                });
              });
          }
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
    },

    async passwordReset() {
      if (
        this.recovery_email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        const data = {
          email: this.recovery_email
        };
        this.axios
          .post("/api/reset_password/", data)
          .then(response => {
            this.messages.push(response.data.info);
            this.recovery_email = "";
          })
          .catch(error => {
            this.errors.push(error.data.info);
            this.recovery_email = "";
          });
      } else {
        this.errors.push("adresse email invalide.");
      }
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
