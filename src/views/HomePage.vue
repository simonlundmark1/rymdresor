<template>
  <div>
    <h1>Välkommen till Rymdresor</h1>
     <searchbar  :search-query="searchQuery" @update-query="updateSearchQuery"/>
    <space-experience-list :experiences="filteredItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SpaceExperienceList from '../components/SpaceExperienceList.vue';
import Searchbar from '../components/Searchbar.vue';


export default defineComponent({
  name: 'HomePage',
  components: { SpaceExperienceList,
     Searchbar },
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
