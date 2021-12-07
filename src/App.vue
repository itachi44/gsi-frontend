<template>
  <div id="app">
    <SideBar />
    <br />
    <router-view></router-view>
  </div>
</template>


<script>
import SideBar from "@/components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar
  }
};
</script>
<style >
</style>
