<template>
  <div class="content">
    <div class="loginForm">
      <div class="header">
        <img src="@/assets/logo.svg" />
      </div>
      <p class="headerText">Réinitialiser votre mot de passe</p>
      <br />

      <form @submit.prevent="resetPwd" class="inputs">
        <vs-input
          size="large"
          class="formInput"
          color="#F0DBBA"
          type="password"
          placeholder="Password1"
          v-model="password1"
        />
        <br />
        <br />
        <vs-input
          size="large"
          class="formInput"
          color="#F0DBBA"
          type="password"
          placeholder="Password2"
          v-model="password2"
        />
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
export default {
  name: "reset_Password",
  components: {},
  data() {
    return {
      uidb: "",
      key: "",
      password1: "",
      password2: "",
      errors: [],
      messages: []
    };
  },
  mounted() {
    let uri = window.location.href.split("?");
    let vars = uri[1].split("&");
    this.uidb = vars[0].split("=")[1];
    this.key = vars[1].split("=")[1];
    //verifions la validité du token
    const formData = {
      uidb: this.uidb,
      token: this.key
    };

    this.axios
      .post("/api/password_reset_check/", formData)
      .then(response => {
        console.log(response.data);

        return response.data;
      })
      .catch(error => {
        alert(
          "Désolé le lien n'est plus valide! Veuillez contacter le fournisseur."
        );
        const toPath = this.$route.query.to || "/login";

        this.$router.push(toPath);
        return error;
      });
  },
  methods: {
    async resetPwd() {
      const formData = {
        password: this.password1,
        uidb64: this.uidb,
        token: this.key
      };

      await this.axios
        .patch("/api/password_reset_complete/", formData)
        .then(response => {
          console.log(response.data);
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
  align-content: center;
  justify-content: center;
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
</style>