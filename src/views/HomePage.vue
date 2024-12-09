<template>
  <Banner />
  <div class="home-hero">
    <Navbar @search="handleSearch"/>
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
  methods: {  
handleSearch(query: string) {
      this.searchQuery = query;
      this.searchForExperience(query);
    },

     searchForExperience(query:string) {
      const searchQuery = query.trim().toLowerCase();
      const matchingExperience = this.experiences.find((experience) =>
        experience.title.trim().toLowerCase().includes(searchQuery)
      );
      if (matchingExperience) {
        const index = this.experiences.indexOf(matchingExperience);
        const element = document.querySelector(`[data-ref="experience-${index}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        console.warn("No matching experience found.");
      }
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
