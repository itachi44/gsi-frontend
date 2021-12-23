<template>
  <div class="container">
    <section class="content">
      <p style="font-size:1.5em; color:#CA7900;">Implementation du programme ici</p>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Programme",
  components: {},
  props: {
    user: {
      type: []
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated"
    })
  }
};
</script>
