import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: { name: "factura" },
  },

  {
    path: "/clientes",
    name: "clientes",
    component: () => import("../models/clientes/pages/clientes.vue"),
  },

  {
    path: "/productos",
    name: "producto",
    component: () => import("../models/productos/pages/productos.vue"),
  },
  {
    path: "/factura",
    name: "factura",
    component: () => import("../models/factura/pages/factura.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
