import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import BookingPage from "../views/BookingPage.vue";
import PackagePage from "../views/PackagePage.vue";
import SpaceExperienceDetail from "../components/SpaceExperienceDetail.vue";
import CheckoutView from "../views/CheckoutView.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  {
    path: "/booking/:id",
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
  {path: "/checkout", component: CheckoutView} 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
