import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import CheckoutView from "../views/CheckoutView.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  {
    path: "/booking/:id",
    name: "booking",
    component: () => import("../views/BookingPage.vue"),
  },
  {
    path: "/secondBookingPage",
    name: "secondBookingPage",
    component: () => import("../views/SecondBookingPage.vue"), // Byt ut mot din komponent
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
  { path: "/checkout", component: CheckoutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
