<template>
  <div :style="backgroundImageStyle" class="experience-container">
    <h2>{{ experience?.title }}</h2>
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
      experience: null as any,
    };
  },
  async created() {
    const route = useRoute();
    const id = route.params.id;
    const res = await fetch('/src/data/data.json');
    const data = await res.json();
    this.experience = data.experiences.find((exp: any) => exp.id == id);
  },
  computed: {
    backgroundImageStyle() {
      if (this.experience?.image) {
        return {
          backgroundImage: `url(${this.experience.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      }
      return {};
    },
  },
});
</script>

<style scoped>
.experience-container {
  border: 2px solid #ccc;
  padding: 20px;
  color: #ffffff;
}
</style>
