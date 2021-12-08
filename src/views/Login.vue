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
          style="width:200px;"
          class="formInput"
          color="#F0DBBA"
          v-model="identifiantValue"
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
          v-model="passwordValue"
        />
        <br />
        <br />
        <div class="stuffs">
          <vs-checkbox color="#CA7900" v-model="checkBox1">Se souvenir de moi ?</vs-checkbox>
          <router-link
            to="/"
            style="text-decoration:none; color:#CA7900; margin-top:2%; margin-left:20%; font-size:0.9em;"
          >Mot de passe oublié ?</router-link>
        </div>
        <br />
        <br />
        <vs-button
          style="color:#CA7900; background-color:#CA7900; width:70%; border-radius:4%; transform:scale(1.2);"
          color="#CA7900"
          flat
          :active="active == 1"
          @click="active = 1"
        >
          <span style="color:#fff;">Connexion</span>
        </vs-button>
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
    passwordValue: "",
    identifiantValue: ""
  }),
  methods: {
    logInUser() {
      this.axios
        .post("/api/login")
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
}
.image {
  width: 60%;
  margin-bottom: 30%;
}

.loginForm {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
</style>
