<template>
  <div class="grid-container">
    <div class="checkout-container">
      <h1>Checkout</h1>
      <p class="gratitudeText">
        Tack för din beställning, vänligen se över dina resor innan betalning.
      </p>
      <ul>
        <li v-for="item in cartStore.items" :key="item.id">
          <p>{{ item.name }} - {{ item.price }}kr x {{ item.quantity }}</p>
        </li>
      </ul>
      <p>Total: {{ cartStore.totalPrice }}kr</p>
      <button class="checkout-button" @click="toggleModal" title="Betala">Betala</button>
      <CheckoutModal v-if="isModalOpen" @close="toggleModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "../stores/cart";
import CheckoutModal from "../components/Checkoutmodal.vue";

const cartStore = useCartStore();
const isModalOpen = ref(false);

function toggleModal() {
  isModalOpen.value = !isModalOpen.value;
}
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 800px) 1fr;
  grid-template-rows: auto 1fr auto;
  grid-gap: 20px;
  padding: 20px;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}

.checkout-container {
  margin: 100px 0 0 0;
  grid-column: 2;
  grid-row: 2;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  text-align: center;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #1e3c72;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  letter-spacing: 1.5px;
}

.gratitudeText {
  font-weight: bold;
}

p {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #555;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 1.1rem;
  color: #444;
}

.checkout-button {
  display: inline-block;
  background: linear-gradient(135deg, #4caf50, #388e3c);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-button:hover {
  background: linear-gradient(135deg, #388e3c, #2e7d32);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.footer {
  grid-column: 1 / -1; /* Span both columns */
  grid-row: 3; /* Place in the last row */
  text-align: center;
  background-color: #222; /* Dark background */
  color: white;
  padding: 10px 0;
}

.footer a {
  color: lightgreen;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: limegreen;
}
</style>
