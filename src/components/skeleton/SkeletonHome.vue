<template>
  <div class="skeleton-loader">
    <!-- Navbar Placeholder -->
    <div class="skeleton navbar"></div>

    <!-- Hero Section Placeholder -->
    <div class="skeleton hero"></div>

    <!-- Clock Placeholder -->
    <div class="skeleton clock"></div>

    <!-- Hero Image Placeholder -->
    <div class="skeleton hero-img"></div>

    <!-- Twin Towers Placeholder -->
    <div class="skeleton twin-towers"></div>

    <!-- Techno Placeholder -->
    <div class="skeleton techno"></div>

    <!-- Jesus Placeholder -->
    <div class="skeleton jesus"></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
};
</script>

<style scoped>
/* Container styles for the skeleton loader */
.skeleton-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Base skeleton style */
.skeleton {
  background: #f0f0f0;
  border-radius: 12px;
  animation: pulse 1.5s infinite ease-in-out;
  width: 100%;
  max-width: 1200px;
}

/* Specific skeleton styles */
.skeleton.navbar {
  height: 60px;
  border-radius: 12px;
}

.skeleton.hero {
  height: 60vh;
  border-radius: 16px;
}

.skeleton.clock {
  width: 40%;
  height: 50px;
  border-radius: 50px;
}

.skeleton.hero-img {
  width: 90%;
  height: 200px;
  border-radius: 12px;
}

.skeleton.twin-towers,
.skeleton.techno,
.skeleton.jesus {
  width: 80%;
  height: 100px;
  border-radius: 12px;
}

/* Pulse animation for a modern loader effect */
@keyframes pulse {
  0% {
    background-color: #e6e6e6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  50% {
    background-color: #f0f0f0;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  100% {
    background-color: #e6e6e6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
}
</style>
