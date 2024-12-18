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
          <p v-if="selectedTrip.discount" class="discount-badge">
            {{ selectedTrip.discount }}
          </p>
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
            <label>Antal dagar:</label>
            <input
              type="number"
              v-model.number="bookingDetails.days"
              min="1"
              max="30"
              required
            />
          </div>

          <div class="form-group passengers-group">
            <label>Antal resenärer:</label>
            <div class="passenger-inputs">
              <div class="passenger-type">
                <label>Vuxna (18+ år)</label>
                <input
                  type="number"
                  v-model.number="bookingDetails.passengers.adults"
                  min="1"
                  max="10"
                  required
                />
              </div>
              <div class="passenger-type">
                <label>Barn (0-17 år)</label>
                <input
                  type="number"
                  v-model.number="bookingDetails.passengers.children"
                  min="0"
                  max="10"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Tillägg:</label>
            <div class="extras-grid">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="bookingDetails.extras.insurance"
                />
                Tidsreseförsäkring (+1000 kr per person)
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="bookingDetails.extras.guide" />
                Personlig tidsguide (+2000 kr per dag)
              </label>
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="bookingDetails.extras.equipment"
                />
                Tidsenlig utrustning (+1500 kr per person)
              </label>
            </div>
          </div>

          <div class="price-summary">
            <h4>Sammanfattning</h4>
            <div class="price-details">
              <div class="base-price-details">
                <p>Grundpris: {{ formatPrice(originalBasePrice) }}</p>
                <p v-if="discount" class="discount-text">
                  Rabatt ({{ discount }}): -{{ formatPrice(discountAmount) }}
                </p>
                <p v-if="discount" class="discounted-price">
                  Efter rabatt: {{ formatPrice(basePrice) }}
                </p>
              </div>
              <div class="passenger-summary">
                <p>
                  Vuxna: {{ bookingDetails.passengers.adults }} ×
                  {{ formatPrice(adultPrice) }}
                </p>
                <p v-if="bookingDetails.passengers.children">
                  Barn: {{ bookingDetails.passengers.children }} ×
                  {{ formatPrice(childPrice) }}
                </p>
                <p>Antal dagar: {{ bookingDetails.days }}</p>
              </div>
              <div class="extras-summary" v-if="hasExtras">
                <p v-if="bookingDetails.extras.insurance">
                  Försäkring: {{ formatPrice(insurancePrice) }}
                </p>
                <p v-if="bookingDetails.extras.guide">
                  Guide: {{ formatPrice(guidePrice) }}
                </p>
                <p v-if="bookingDetails.extras.equipment">
                  Utrustning: {{ formatPrice(equipmentPrice) }}
                </p>
              </div>
              <p class="total-price">Totalt: {{ formatPrice(totalPrice) }}</p>
            </div>
          </div>

          <div class="button-group">
            <button type="button" class="cancel-btn" @click="$emit('close')">
              Avbryt
            </button>
            <button type="submit" class="book-btn">
              Lägg till i resväskan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps<{
  selectedTrip: {
    id: number;
    title: string;
    description: string;
    price: number;
    discount?: string;
  };
}>();

const emit = defineEmits(["close", "booked"]);
const cartStore = useCartStore();

const bookingDetails = ref({
  departureDate: route.query.departureDate || "",
  days: Number(route.query.days) || 1,
  passengers: {
    adults: Number(route.query.adults) || 1,
    children: Number(route.query.children) || 0,
  },
  extras: {
    insurance: route.query.insurance === "true" || false,
    guide: route.query.guide === "true" || false,
    equipment: route.query.equipment === "true" || false,
  },
});

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

const discount = computed(() => {
  if (!props.selectedTrip.discount) return null;
  const match = props.selectedTrip.discount.match(/(\d+)%/);
  return match ? Number(match[1]) : null;
});

const totalPassengers = computed(() => {
  return (
    bookingDetails.value.passengers.adults +
    bookingDetails.value.passengers.children
  );
});

// Barn betalar 75% av vuxenpriset
const adultPrice = computed(() => props.selectedTrip.price);
const childPrice = computed(() => Math.round(props.selectedTrip.price * 0.75));

const originalBasePrice = computed(() => {
  return (
    (bookingDetails.value.passengers.adults * adultPrice.value +
      bookingDetails.value.passengers.children * childPrice.value) *
    bookingDetails.value.days
  );
});

const discountAmount = computed(() => {
  if (!discount.value) return 0;
  return (originalBasePrice.value * discount.value) / 100;
});

const basePrice = computed(() => {
  return originalBasePrice.value - discountAmount.value;
});

const insurancePrice = computed(() => {
  return bookingDetails.value.extras.insurance
    ? 1000 * totalPassengers.value
    : 0;
});

const guidePrice = computed(() => {
  return bookingDetails.value.extras.guide
    ? 2000 * bookingDetails.value.days
    : 0;
});

const equipmentPrice = computed(() => {
  return bookingDetails.value.extras.equipment
    ? 1500 * totalPassengers.value
    : 0;
});

const hasExtras = computed(() => {
  return Object.values(bookingDetails.value.extras).some((value) => value);
});

const totalPrice = computed(() => {
  return (
    basePrice.value +
    insurancePrice.value +
    guidePrice.value +
    equipmentPrice.value
  );
});

const formatPrice = (price: number) => {
  return `${price.toLocaleString()} kr`;
};

const handleBooking = () => {
  const bookingItem = {
    id: props.selectedTrip.id,
    name: props.selectedTrip.title,
    price: totalPrice.value,
    quantity: totalPassengers.value,
    days: bookingDetails.value.days,
    passengers: {
      adults: bookingDetails.value.passengers.adults,
      children: bookingDetails.value.passengers.children,
    },
    departureDate: Array.isArray(route.query.departureDate)
      ? route.query.departureDate[0] || ""
      : (route.query.departureDate as string),
    extras: bookingDetails.value.extras,
    discount: props.selectedTrip.discount,
  };

  cartStore.addToCart(bookingItem);
  emit("booked");
  emit("close");
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
  background: red;
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

.discount-badge {
  display: inline-block;
  background: #e82e11;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.passengers-group {
  margin-top: 1rem;
}

.passenger-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.passenger-type {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.passenger-type label {
  font-size: 0.9rem;
  color: #666;
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

.base-price-details {
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.passenger-summary,
.extras-summary {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.discount-text {
  color: #e82e11;
  font-weight: bold;
}

.discounted-price {
  font-weight: bold;
  color: #07700e;
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
  background: #4caf50;
  color: white;
}

.cancel-btn:hover {
  background: #d0d0d0;
}

.book-btn:hover {
  background: #45a049;
}
</style>
