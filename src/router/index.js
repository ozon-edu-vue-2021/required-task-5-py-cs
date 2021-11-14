import Vue from "vue";
import Router from "vue-router";

import Products from "../views/Products.vue";
import Basket from "../views/Basket.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // default 'hash'
  routes: [
    {
      path: "/",
      component: Products,
    },
    {
      path: "/basket",
      component: Basket,
    },
    {
      path: "/favorites",
      component: Products,
    },
  ],
});
