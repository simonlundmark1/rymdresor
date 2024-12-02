<template>
  <div>
    <h1>Välkommen till Rymdresor</h1>
     <searchbar />
    <space-experience-list :experiences="experiences" />
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
