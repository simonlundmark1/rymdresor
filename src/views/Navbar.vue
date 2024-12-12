<template>
  <nav>
    <button @click="toggleCart">Kundvagn</button>
    <CartWidget v-if="isCartOpen" @close="isCartOpen = false" />
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CartWidget from './CartWidget.vue';

const isCartOpen = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};
</script>