import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import BookingPage from '../views/BookingPage.vue';
import PackagePage from '../views/PackagePage.vue';
import SpaceExperienceDetail from '../components/SpaceExperienceDetail.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/booking', component: BookingPage },
  { path: '/packages', component: PackagePage },
  { path: '/experience/:id', component: SpaceExperienceDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
