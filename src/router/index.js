import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import AddPhone from "../views/AddPhone.vue";
import VerifyPhone from "../views/VerifyPhone.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/addPhone",
    name: "AddPhone",
    component: AddPhone,
  },
  {
    path: "/verifyPhone",
    name: "VerifyPhone",
    component: VerifyPhone,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) === true &&
    store.getters.isLoggedIn === false
  )
    next({ name: "AddPhone" });
  else next();
  // return console.log(to.matched.some(record => record.meta.requiresAuth))
});
export default router;
