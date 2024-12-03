<template>
  <div class="booking-hero">
    <Navbar/>
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