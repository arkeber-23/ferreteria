<template>
  <navbar></navbar>
  <div class="container shadow-lg p-3 mb-5 bg-body rounded">

<router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    Navbar: defineAsyncComponent(() =>
      import("./models/shared/components/navbar.vue")
    ),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
