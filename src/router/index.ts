import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  {
    path: "/booking",
    name: "booking",
    component: () => import("../views/BookingPage.vue"),
  },
  {
    path: "/packages",
    name: "package",
    component: () => import("../views/PackagePage.vue"),
  },
  {
    path: "/experience/:id",
    name: "experience",
    component: () => import("../components/SpaceExperienceDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
