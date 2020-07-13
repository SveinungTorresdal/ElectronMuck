import Vue from "vue";
import VueRouter from "vue-router";
import LoginServer from "../views/LoginServer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginServer",
    component: LoginServer
  },
  {
    path: "/open",
    name: "OpenServer",
    component: () => import("../views/OpenServer.vue")
  },
  {
    path: "/options",
    name: "Options",
    component: () => import("../views/Options.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
