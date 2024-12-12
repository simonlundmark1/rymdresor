<template>
  <div class="booking-hero">
    <Navbar/>
    <div class="booking-content">
      <div v-if="selectedTrip" class="trip-preview">
        <div class="trip-image">
          <img :src="selectedTrip.image[0]" :alt="selectedTrip.title">
        </div>
        <div class="trip-info">
          <h2>{{ selectedTrip.title }}</h2>
          <p>{{ selectedTrip.description }}</p>
          <button class="book-now-btn" @click="showBookingModal = true">Boka nu</button>
        </div>
      </div>
      <div v-else class="loading">
        Laddar resa...
      </div>
    </div>

    <div v-if="showConfirmation" class="booking-confirmation">
      <div class="confirmation-content">
        <h3>Resan har lagts till i kundvagnen!</h3>
        <p>Du hittar din bokning i kundvagnen.</p>
        <button @click="showConfirmation = false" class="close-confirmation">OK</button>
      </div>
    </div>

    <BookingModal 
      v-if="showBookingModal && selectedTrip" 
      :selectedTrip="selectedTrip"
      @close="showBookingModal = false"
      @booked="handleBooked"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import BookingModal from '../components/BookingModal.vue';

const route = useRoute();
const router = useRouter();
const selectedTrip = ref<any>(null);
const showBookingModal = ref(false);
const showConfirmation = ref(false);

const fetchTripDetails = async () => {
  try {
    const [resOne, resTwo] = await Promise.all([
      fetch('/src/data/data.json'),
      fetch('/src/data/offersData.json')
    ]);
    
    const dataOne = await resOne.json();
    const dataTwo = await resTwo.json();
    
    const allTrips = [...dataOne.experiences, ...dataTwo];
    const tripId = Number(route.params.id);
    
    selectedTrip.value = allTrips.find(trip => trip.id === tripId);
    
    if (!selectedTrip.value) {
      router.push('/');
    }
  } catch (error) {
    console.error('Error fetching trip details:', error);
  }
};

const handleBooked = () => {
  showBookingModal.value = false;
  showConfirmation.value = true;
  setTimeout(() => {
    showConfirmation.value = false;
  }, 3000);
};

onMounted(() => {
  fetchTripDetails();
});
</script>

<style scoped>
.booking-hero {
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('/jordan-steranka-2-MmXpeN8YE-unsplash.jpg') center/cover no-repeat;
}

.booking-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
}

.trip-preview {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  margin-top: 2rem;
}

.trip-image {
  flex: 1;
  min-height: 400px;
}

.trip-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.trip-info {
  flex: 1;
  padding: 2rem;
  color: #333;
}

.trip-info h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.trip-info p {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.book-now-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.book-now-btn:hover {
  background: #45a049;
}

.loading {
  text-align: center;
  color: white;
  padding: 2rem;
  font-size: 1.2rem;
}

.booking-confirmation {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.confirmation-content {
  text-align: center;
}

.confirmation-content h3 {
  margin: 0 0 0.5rem 0;
}

.confirmation-content p {
  margin: 0 0 1rem 0;
}

.close-confirmation {
  background: white;
  color: #4CAF50;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .trip-preview {
    flex-direction: column;
  }
  
  .trip-image {
    min-height: 250px;
  }
}
</style>