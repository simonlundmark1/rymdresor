<template>
  <div class="skeleton-loader">
    <div class="skeleton navbar"></div>
    <div class="skeleton hero"></div>
    <div class="skeleton clock"></div>
    <div class="skeleton hero-img"></div>
    <div class="skeleton twin-towers"></div>
    <div class="skeleton techno"></div>
    <div class="skeleton jesus"></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
};
</script>

<style scoped>
.skeleton-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.skeleton {
  background: #e0e0e0;
  border-radius: 8px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton.navbar {
  width: 100%;
  height: 60px;
}

.skeleton.hero {
  width: 100%;
  height: 60vh;
}

.skeleton.clock {
  width: 120px;
  height: 120px;
}

.skeleton.hero-img {
  width: 90%;
  height: 200px;
}

.skeleton.twin-towers,
.skeleton.techno,
.skeleton.jesus {
  width: 80%;
  height: 100px;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>
