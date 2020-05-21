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
    path: "/Home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue")
  },
  {
    path: "/u/logs",
    name: "Log de activitades",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/admin/ActivityLogs.vue")
  },
  {
    path: "/u/assistants",
    name: "Asistentes",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/admin/Assistants.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
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
