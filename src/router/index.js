import Vue from "vue";
import Router from "vue-router";
import App from "../App";
import Auth from "../components/Auth";
import House from "../components/House";
import Occasion from "../components/Occasion";
import AllOccasion from "../components/AllOccasion";
import Main from "../components/Main";
import Chart from "../components/Chart";
import Dashboard from "../components/Dashboard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth
    },
    {
      path: "/occasion",
      name: "occasion",
      component: Occasion
    },
    {
      path: "/occasion/all",
      name: "all-occasion",
      component: AllOccasion,
      props: true
    },
    {
      path: "/house/:id",
      name: "house",
      component: House,
    },
    {
      path: "/chart",
      name: "chart",
      component: Chart,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    // {
    //   path: "/dashboard",
    //   name: "dashboard",
    //   component: Dashboard,
    // }
  ]
});
