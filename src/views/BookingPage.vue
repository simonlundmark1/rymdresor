<template>
  <div class="booking-hero">
    <Navbar :onSearch="handleSearch" />
    <main>
      <h1>Paket Erbjudanden</h1>
      <SelectedTripInfo />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../components/Navbar.vue';
import SelectedTripInfo from '../components/SelectedTripInfo.vue';

export default defineComponent({
  name: 'BookingPage',
  components: { Navbar, SelectedTripInfo },
  data() {
    return {
      formData: {
        destination: '',
        days: '',
        adults: '',
        children: '',
      },
      results: [] as any[],
      searchTerm: '',
      formFields: {
        destination: 'Destination',
        days: 'Resedagar:',
        adults: 'Antal Vuxna:',
        children: 'Antal Barn:',
      },
      options: {
        destination: [
          { value: '', text: 'Välj Destination', disabled: true },
          { value: '1', text: 'Bränn Gävlebocken' },
          { value: '2', text: '9/11' },
          { value: '3', text: 'Neo-Utopia' },
          { value: '4', text: 'Jul 2006' },
          { value: '5', text: 'Ölsvämning i London' },
          { value: '6', text: 'Strutskriget' },
          { value: '7', text: 'Renässansen' },
        ],
        days: [
          { value: '', text: 'Välj dagar', disabled: true },
          { value: '5', text: '5 dagar' },
          { value: '7', text: '7 dagar' },
          { value: '10', text: '10 dagar' },
          { value: '11', text: '11 dagar' },
          { value: '12', text: '12 dagar' },
          { value: '14', text: '14 dagar' },
          { value: '21', text: '21 dagar' },
        ],
        adults: [
          { value: '', text: 'Välj vuxna', disabled: true },
          { value: '1', text: '1 vuxen' },
          { value: '2', text: '2 vuxna' },
          { value: '3', text: '3 vuxna' },
          { value: '4', text: '4 vuxna' },
        ],
        children: [
          { value: '', text: 'Välj barn', disabled: true },
          { value: '0', text: 'Inga barn' },
          { value: '1', text: '1 barn' },
          { value: '2', text: '2 barn' },
          { value: '3', text: '3 barn' },
          { value: '4', text: '4 barn' },
        ],
      },
    };
  },
  methods: {
    async submitBooking() {
      const { destination, days, adults, children } = this.formData;
      if (destination && days && adults && children) {
        try {
          const res = await fetch('/src/data/data.json');
          const data = await res.json();
          this.results = data.experiences.flatMap((exp: any) =>
            exp.availableTrips.filter((trip: any) => {
              return (
                trip.durationDays === parseInt(days) &&
                trip.adults >= parseInt(adults) &&
                trip.children >= parseInt(children)
              );
            })
          );
        } catch (error) {
          console.error('Failed to fetch booking data:', error);
        }
      }
    },
    handleSearch(searchTerm: string) {
      this.searchTerm = searchTerm;
      console.log('Searching for:', searchTerm);
    },
  },
});
</script>

<style scoped>
.booking-hero {
  background-color: white;
  height: 100vh;
}

main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.hero-title {
  font-size: 80px;
  animation: fadeIn 1s ease-in-out, slideUp 1s ease-in-out;
}

.combined-select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
}

.booking-form-container {
  padding: 1rem;
  background-color: rgb(222, 242, 246);
  border-radius: 2rem;
  width: 60rem;
  color: black;
}

.booking-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.input-column {
  flex: 1;
  min-width: 10rem;
}

select {
  background-color: white;
  color: black;
}

button {
  height: 3rem;
  padding: 0 1.6rem;
  border-radius: 2rem;
  background: none;
  border: none;
  background-color: red;
  font-size: large;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}
</style>
