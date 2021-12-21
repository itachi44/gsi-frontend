<template>
  <div class="content">reset password</div>
</template>

<script>
export default {
  name: "reset Password",
  components: {},
  data() {
    return {
      uidb: "",
      key: ""
    };
  },

  mounted() {
    console.log("okk");
    this.uidb = this.$route.query.uidb;
    this.key = this.$route.query.key;
    console.log(this.uidb);
    console.log(this.key);
    console.log(this.$route.query);
  }
};
</script>
