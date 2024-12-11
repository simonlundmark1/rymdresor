<template>
   
    <div class="grid-container">
        <div class="footer">
           
        </div>

        <div class="checkout-container">
            <h1>Checkout</h1>
            <p>Tack för din beställning, vänligen se över dina resor innan betalning.</p>
            <ul>
                <li v-for ="item in cartStore.items" :key="item.id" >
                    <p>{{ item.name }} - {{ item.price }}kr x {{ item.quantity }}</p>

                   
                </li>
            </ul>
            <p>Total: {{ cartStore.totalPrice }}kr</p>

            <button class="checkout-button">
                Betala
            </button>
        </div>
    </div>
</template>



<script setup lang="ts">

import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();




</script>
<style scoped>
/* Define the grid layout */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr; /* Two equal columns */
    grid-template-rows: 20% 40% auto; /* Auto for content rows, fixed for navbar */
    grid-gap: 20px;
    margin: 20px;
    min-height: 100vh; /* Ensure the grid takes the full height of the viewport */
}

/* Style the checkout container */
.checkout-container {
    grid-column: 2; /* Place in the second column */
    grid-row: 2; /* Place in the second row */
  
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
