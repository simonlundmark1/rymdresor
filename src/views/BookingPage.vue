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
          <button @click="addToCart(result)">Lägg till i kundvagn</button>
        </li>
      </ul>
    </div>
    <SelectedTripInfo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../components/Navbar.vue';
import SelectedTripInfo from '../components/SelectedTripInfo.vue';
import { useCartStore } from '../stores/cart';

export default defineComponent({
  name: 'BookingPage',
  components: {
    Navbar,
    SelectedTripInfo
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
    },
    addToCart(result: any) {
      const cartStore = useCartStore();
      const item = {
        id: result.id,
        name: `Trip on ${result.date}`,
        price: result.price,
        quantity: this.people,
      };
      cartStore.addToCart(item);
    },
  }
});
</script>

<style scoped>
.booking-hero {
    background: url('/jordan-steranka-2-MmXpeN8YE-unsplash.jpg') top no-repeat;
    background-size: cover;
    height: 100vh;
  }
  
  .section-1 {
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .hero-title {
    font-size: 80px;
    animation: fadeIn 1s ease-in-out, slideUp 1s ease-in-out;
  }
  
</style>