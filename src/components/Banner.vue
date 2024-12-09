<template>
  <RouterLink to="/packages" class="banner-link">
    <div class="banner">
      <div class="text-wrapper">
        <div class="text-content">
          <span>🎅 MISSA INTE 🎄 JULREA 🎄🎅🎄 FYNDA </span>
          <span>🎄🎄 JULREA 🎅🎅 SKYNDA FYNDA </span>
          <span>🎄🎅 JULREA 🎄 FYNDA NU 🎄 JULREA 🎅🎄🎄 FYNDA</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts"></script>

<style scoped>
.banner-link {
  text-decoration: none;
}
.banner {
  width: 100%;
  background-color: black;
  color: white;
  overflow: hidden;
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.text-wrapper {
  display: flex;
  width: 200%;
  white-space: nowrap;
  overflow: hidden;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>