import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/authentication/Login.vue";
import Registration from "./components/authentication/Registration.vue";
import AuthGuard from "./router/AuthGuard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration
    }
  ]
});
