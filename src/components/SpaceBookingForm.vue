<template>
  <div class="space-booking-form">
    <h2>Book Your Space Journey</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Form fields will be added here -->
    </form>
  </div>
</template>

<script setup lang="ts">
const handleSubmit = () => {
  // Form submission logic will be added here
}
</script>

<style scoped>
.space-booking-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}
</style> 