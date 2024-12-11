<template>
  <div class="grid-container">
    <div class="footer"></div>

    <div class="checkout-container">
      <h1>Checkout</h1>
      <p>Tack för din beställning, vänligen se över dina resor innan betalning.</p>
      <ul>
        <li v-for="item in cartStore.items" :key="item.id">
          <p>{{ item.name }} - {{ item.price }}kr x {{ item.quantity }}</p>
        </li>
      </ul>
      <p>Total: {{ cartStore.totalPrice }}kr</p>

      <!-- Button to open the modal -->
      <button class="checkout-button" @click="toggleModal">
        Betala
      </button>

      <!-- Modal Component -->
      <CheckoutModal v-if="isModalOpen" @close="toggleModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import CheckoutModal from '../components/CheckoutModal.vue'; // Import the modal component

const cartStore = useCartStore();
const isModalOpen = ref(false);

function toggleModal() {
  isModalOpen.value = !isModalOpen.value;
}
</script>
<style scoped>
/* Define the grid layout */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr; 
    grid-template-rows: 20% 40% auto; 
    grid-gap: 20px;
    margin: 20px;
    min-height: 100vh; 
}


.checkout-container {
    grid-column: 2;
    grid-row: 2; 
  
    padding: 20px;
    color: white;
    position: relative;
}


h1 {
    font-size: 48px;
    margin-bottom: 10px;
    text-decoration: underline;
    text-decoration-color: lightgreen; /* Light green underline */
    text-decoration-thickness: 4px; /* Thicker underline */
}

p {
    font-size: 18px;
    margin-bottom: 10px;
    
    
}
/* Style the button */
.checkout-button {
    background-color: limegreen;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.2s, background-color 0.2s;
}

.checkout-button:hover {
    background-color: #45a049; /* Darker green */
    transform: scale(1.1); /* Slightly larger */
}

/* Style the navbar */
.footer {
    grid-column: 1 / -1; /* Span both columns */
    grid-row: 3; /* Place in the last row */
    text-align: center;
    background-color: #222; /* Dark background */
    color: white;
    padding: 10px 0;
}
</style>
