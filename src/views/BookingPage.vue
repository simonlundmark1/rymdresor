<template>
  <div class="booking-hero">
    <Navbar/>
    <h2>Boka din rymdupplevelse</h2>
    <form @submit.prevent="submitBooking">
      <label>
        Antal dagar:
        <input type="number" v-model.number="days" min="1" />
      </label>
      <label>
        Antal personer:
        <input type="number" v-model.number="people" min="1" />
      </label>
      <button type="submit">Visa resultat</button>
    </form>
    <div v-if="results.length">
      <h3>Resultat:</h3>
      <ul>
        <li v-for="result in results" :key="result.date">
          Datum: {{ result.date }} - Pris: {{ result.price }} SEK
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../components/Navbar.vue';
import '../style/view/BookingPage.css';

export default defineComponent({
  name: 'BookingPage',
  components: {
    Navbar
  },
  data() {
    return {
      days: 1,
      people: 1,
      results: [] as any[]
    };
  },
  methods: {
    async submitBooking() {
      const res = await fetch('/src/data/data.json');
      const data = await res.json();
      // Här kan du lägga till logik för att filtrera resultat baserat på val
      this.results = data.experiences.flatMap((exp: any) => exp.availableTrips);
    }
  }
});
</script>

<style>
</style>