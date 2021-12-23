<template>
  <div class="container">
    <section class="content">
      <p style="font-size:1.5em; color:#CA7900;">Implementation de la messagerie ici</p>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Messagerie",
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
