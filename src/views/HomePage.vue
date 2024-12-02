<template>
  <div class="home-hero">
    <Navbar/>
    <h1 class="hero-title">Välkommen till Tidsresor</h1>
  </div>
  <space-experience-list :experiences="experiences" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SpaceExperienceList from '../components/SpaceExperienceList.vue';
import Searchbar from '../components/Searchbar.vue';
import Navbar from '../components/Navbar.vue'

export default defineComponent({
  name: 'HomePage',
  components: { SpaceExperienceList,
     Searchbar,
     Navbar },
  data() {
    return {
         searchQuery: "",
      experiences: [] as any[]
    };
  },  computed: {
    filteredItems() {
  const query = this.searchQuery.trim().toLowerCase(); 
    return this.experiences.filter((experience) =>
      experience.title.toLowerCase().includes(query)
    );
  }
  },
  methods: {  updateSearchQuery(newQuery: string) {
    this.searchQuery = newQuery;
  }
  },
 async created() {
  try {
    const res = await fetch("/src/data/data.json");
    const data = await res.json();
    console.log("Fetched experiences:", data.experiences); 
    this.experiences = data.experiences;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
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
