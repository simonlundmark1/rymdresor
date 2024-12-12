<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Boka din tidsresa</h2>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="trip-details" v-if="selectedTrip">
          <h3>{{ selectedTrip.title }}</h3>
          <p>{{ selectedTrip.description }}</p>
        </div>

        <form @submit.prevent="handleBooking">
          <div class="form-group">
            <label>Avresedatum:</label>
            <input 
              type="date" 
              v-model="bookingDetails.departureDate"
              :min="minDate"
              required
            />
          </div>

          <div class="form-group">
            <label>Antal personer:</label>
            <input 
              type="number" 
              v-model.number="bookingDetails.passengers"
              min="1"
              max="10"
              required
            />
          </div>

          <div class="form-group">
            <label>Tillägg:</label>
            <div class="extras-grid">
              <label class="checkbox-label">
                <input 
                  type="checkbox"
                  v-model="bookingDetails.extras.insurance"
                /> Tidsreseförsäkring (+1000 kr)
              </label>
              <label class="checkbox-label">
                <input 
                  type="checkbox"
                  v-model="bookingDetails.extras.guide"
                /> Personlig tidsguide (+2000 kr)
              </label>
              <label class="checkbox-label">
                <input 
                  type="checkbox"
                  v-model="bookingDetails.extras.equipment"
                /> Tidsenlig utrustning (+1500 kr)
              </label>
            </div>
          </div>

          <div class="price-summary">
            <h4>Sammanfattning</h4>
            <div class="price-details">
              <p>Grundpris: {{ formatPrice(basePrice) }}</p>
              <p v-if="bookingDetails.extras.insurance">Försäkring: 1000 kr</p>
              <p v-if="bookingDetails.extras.guide">Guide: 2000 kr</p>
              <p v-if="bookingDetails.extras.equipment">Utrustning: 1500 kr</p>
              <p class="total-price">Totalt: {{ formatPrice(totalPrice) }}</p>
            </div>
          </div>

          <div class="button-group">
            <button type="button" class="cancel-btn" @click="$emit('close')">Avbryt</button>
            <button type="submit" class="book-btn">Lägg till i kundvagn</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';

const props = defineProps<{
  selectedTrip: {
    id: number;
    title: string;
    description: string;
    price: number;
  }
}>();

const emit = defineEmits(['close', 'booked']);
const cartStore = useCartStore();

const bookingDetails = ref({
  departureDate: '',
  passengers: 1,
  extras: {
    insurance: false,
    guide: false,
    equipment: false
  }
});

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const basePrice = computed(() => {
  return props.selectedTrip.price * bookingDetails.value.passengers;
});

const totalPrice = computed(() => {
  let total = basePrice.value;
  if (bookingDetails.value.extras.insurance) total += 1000;
  if (bookingDetails.value.extras.guide) total += 2000;
  if (bookingDetails.value.extras.equipment) total += 1500;
  return total;
});

const formatPrice = (price: number) => {
  return `${price.toLocaleString()} kr`;
};

const handleBooking = () => {
  const bookingItem = {
    id: props.selectedTrip.id,
    name: props.selectedTrip.title,
    price: totalPrice.value,
    quantity: bookingDetails.value.passengers,
    departureDate: bookingDetails.value.departureDate,
    extras: bookingDetails.value.extras
  };
  
  cartStore.addToCart(bookingItem);
  emit('booked');
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  color: #333;
}

.modal-header {
  background: #1a1a1a;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding: 1.5rem;
}

.trip-details {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="date"],
input[type="number"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.extras-grid {
  display: grid;
  gap: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
}

.price-summary {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin: 1.5rem 0;
}

.price-details {
  margin-top: 0.5rem;
}

.total-price {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #ddd;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.cancel-btn,
.book-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.cancel-btn {
  background: #e0e0e0;
}

.book-btn {
  background: #4CAF50;
  color: white;
}

.cancel-btn:hover {
  background: #d0d0d0;
}

.book-btn:hover {
  background: #45a049;
}
</style> 