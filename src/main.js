import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as VueGoogleMaps from "vue2-google-maps";
import "chart.js";
import "hchs-vue-charts";
import VueCookies from 'vue-cookies'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'


Vue.use(VueMaterial);
Vue.use(VueCookies);
Vue.use(window.VueCharts);
Vue.use(VueGoogleMaps, {
  load: {key: 'AIzaSyD90bNQY4J8bG6mh4daT0AznQeTqKJN2ws'}
});

new Vue({
  el: "#app",
  router,
  // render: h => h(App)
  template: "<App/>",
  components: {App}
});
