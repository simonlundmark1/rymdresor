<template>
  <div class="home-hero">
    <Navbar/>
    <div class="section-1 section">
      <h1 class="hero-title">Välkommen till Tidsresor</h1>
    </div>
  </div>
  <space-experience-list :experiences="experiences" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SpaceExperienceList from '../components/SpaceExperienceList.vue';
import Navbar from '../components/Navbar.vue'

export default defineComponent({
  name: 'HomePage',
  components: { 
    SpaceExperienceList,
    Navbar
   },
  data() {
    return {
      experiences: [] as any[]
    };
  },
  async created() {
    const res = await fetch('/src/data/data.json');
    const data = await res.json();
    this.experiences = data.experiences;
  }
});
</script>

<style>
.home-hero{
  background-image: url('/massimiliano-morosinotto-MljwsnGwdOY-unsplash.jpg');
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

.section-1{
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-title{
  font-size: 80px;
  animation: fadeIn 1s ease-in-out, slideUp 1s ease-in-out;
  text-align: center;
}

@media (max-width: 768px) {



  .hero-title{
    font-size: 40px !important;
  }
}
</style>
