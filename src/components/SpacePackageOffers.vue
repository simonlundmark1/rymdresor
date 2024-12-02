<template>
  <div class="space-package-offers">
    <h2>Available Packages</h2>
    <div class="packages-grid">
      <!-- Package offers will be rendered here -->
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will be added here
</script>

<style scoped>
.space-package-offers {
  padding: 2rem;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
</style> 