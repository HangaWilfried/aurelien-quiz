import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "login",
      path: "/",
      component: Login
    },
    {
      name: "welcome",
      path: "/welcome",
      component: import("../views/Home.vue"),
    },
    {
      name: "rules",
      path: "/rules",
      component: () => import("../views/Rules.vue"),
    },
    {
      name: "quiz",
      path: "/quiz/:id",
      component: () => import("../views/Quiz.vue"),
    },
    {
      name: "score",
      path: "/quiz/:id/score",
      component: () => import("../views/Score.vue"),
    }
  ]
})

export default router
