<template>
  <div>
    <h2>{{ experience?.title }}</h2>
    <img :src="experience?.image" alt="Experience image" />
    <p>{{ experience?.description }}</p>
    <h3>Resor:</h3>
    <ul>
      <li v-for="trip in experience?.availableTrips" :key="trip.date">
        Datum: {{ trip.date }} - Pris: {{ trip.price }} SEK
      </li>
    </ul>
    <button @click="$router.back()">Tillbaka</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'SpaceExperienceDetail',
  data() {
    return {
      experience: null as any
    };
  },
  async created() {
    const route = useRoute();
    const id = route.params.id;
    const res = await fetch('/src/data/data.json');
    const data = await res.json();
    this.experience = data.experiences.find((exp: any) => exp.id == id);
  }
});
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
