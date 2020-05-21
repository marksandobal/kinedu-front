import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: { requiresAuth: false }
  },
  {
    path: "/u/logs",
    name: "Log de activitades",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/admin/ActivityLogs.vue"),
      meta: { requiresAuth: true }
  },
  {
    path: "/u/assistants",
    name: "Asistentes",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/admin/Assistants.vue")
  },
  {
    path: "/u/babies",
    name: "Bebés",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/admin/Babies.vue")
  },
  {
    path: "/u/activities",
    name: "Actividades",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/admin/Activities.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requiresAuth)
  if (protectedRoute && store.state.token === '') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router;
