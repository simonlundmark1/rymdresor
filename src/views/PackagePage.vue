<template>
  <div class="package-hero">
    <Navbar />
    <h2>Paket Erbjudanden</h2>
    <div class="card-wrapper">
      <div v-for="pkg in pkgs" :key="pkg.id" class="pkg-card">
        <img class="image" :src="getImageUrl(pkg.image)" :alt="pkg.title" />
        <h3>{{ pkg.title }}</h3>
        <p>{{ pkg.description }}</p>
        <p>{{ pkg.food }}</p>
        <button @click="bookPkg(pkg.id)">Boka</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import "../style/view/PackagePage.css";
import pkgs from "../data/offersData.json";

// Router för navigering
const router = useRouter();

const getImageUrl = (imageName: string) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href;
};

// Funktion för att boka paket
const bookPkg = (id: number) => {
  // Lägg till logik för bokning om det behövs
  router.push({ name: "booking", query: { id: id.toString() } });
};
</script>

<style scoped>
.package-hero {
  background: url("../assets/carousel.jpg") center center no-repeat;
  background-size: cover;
  min-height: 100vh;
  text-align: center;
}
.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  flex-wrap: wrap;
}

.pkg-card {
  margin: 2rem;
  padding: 20px;
  border: 1px solid #ccc;
  width: 500px;
  background-color: #f9f9f9;
  color: black;
  max-width: 400px;
  height: 600px;
}
.pkg-card h3 {
  margin: 0 0 10px;
}
.pkg-card button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #e82e11;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.pkg-card button:hover {
  background-color: #82e914;
}

.image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
