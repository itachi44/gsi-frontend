<template>
  <div class="content">
    <div class="imageOverlayed">
      <div class="image">
        <!-- <img src="@/assets/img1.png"/> -->
      </div>

      <div class="textOverlay"></div>
    </div>

    <div class="loginForm"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  components: {}
};
</script>

<style scoped>
.content {
  border: 2px solid red;
  display: flex;
  flex-direction: row;
  height: 400px;
}
.imageOverlayed {
  border: 2px solid blue;
  height: 400px;
  width: 60%;
}

.loginForm {
  border: 2px solid green;
  width: 40%;
}
</style>
