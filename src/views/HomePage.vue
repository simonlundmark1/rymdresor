<template>
  <RouterLink to="/packages" class="banner-link">
    <div class="banner">
      <div class="text-wrapper">
        <div class="text-content">
          <span>🎅 MISSA INTE 🎄 JULREA 🎄🎅🎄 FYNDA </span>
          <span>🎄🎄 JULREA 🎅🎅 SKYNDA FYNDA </span>
          <span>🎄🎅 JULREA 🎄 FYNDA NU 🎄 JULREA 🎅🎄🎄 FYNDA</span>
        </div>
      </div>
    </div>
  </RouterLink>
  <div class="home-hero">
    <Navbar />
    <h1 class="hero-title">Välkommen till Tidsresor</h1>
  </div>
  <space-experience-list :experiences="experiences" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SpaceExperienceList from "../components/SpaceExperienceList.vue";

import Navbar from "../components/Navbar.vue";
import "../style/view/HomePage.css";

export default defineComponent({
  name: "HomePage",
  components: {
    SpaceExperienceList,

    Navbar,
  },
  data() {
    return {
      searchQuery: "",
      experiences: [] as any[],
    };
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.trim().toLowerCase();
      return this.experiences.filter((experience) =>
        experience.title.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    updateSearchQuery(newQuery: string) {
      this.searchQuery = newQuery;
    },
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
  },
});
</script>

<style scoped>
.banner-link {
  text-decoration: none;
}
.banner {
  width: 100%;
  background-color: black;
  color: white;
  overflow: hidden;
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-wrapper {
  display: flex;
  width: 200%;
  white-space: nowrap;
  overflow: hidden;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
