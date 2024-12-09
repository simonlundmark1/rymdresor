<template>
  <Banner />
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
import Banner from "../components/Banner.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    SpaceExperienceList,

    Navbar,
    Banner,
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

<style scoped></style>
