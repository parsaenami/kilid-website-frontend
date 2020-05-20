<template>
  <div id="app">
<!--    <img src="./assets/logo.png" />-->
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      info: null
    };
  },
  methods: {},
  computed: {},
  mounted() {
    // axios
    //   .get("http://hallows.ir/mags")
    //   .then(response => (this.info = response));
  }
};
</script>

<style>
@import url("./style/style.css");
/*@import url("./style/test-style.css");*/
</style>
