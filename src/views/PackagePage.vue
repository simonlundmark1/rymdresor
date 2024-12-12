<template>
  <Navbar @search="handleSearch" />
  <main class="main-content">
    <h2 class="title">Paketerbjudanden</h2>
    <div class="card-wrapper">
      <div v-for="trips in combinedTrips" :key="trips.id" class="pkg-card">
        <div class="image-wrapper">
          <img
            class="image"
            :src="getImageUrl(trips.image[0])"
            :alt="trips.title"
          />
          <p class="overlay-text" v-show="trips.food">{{ trips.food }}</p>
          <p class="discount-text" v-show="trips.discount">
            {{ trips.discount }}
          </p>
        </div>
        <h3>{{ trips.title }}</h3>
        <p class="description">{{ trips.description }}</p>
        <button @click="bookPkg(trips.id)">Boka</button>
      </div>
    </div>
    <Reviews />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import pkgs from "../data/offersData.json";
import trips from "../data/data.json";
import Reviews from "../components/Reviews.vue";

const router = useRouter();

import { ref } from "vue";

const combinedTrips = ref<any[]>([]);

const mergeData = () => {
  combinedTrips.value = [...pkgs, ...trips.experiences];
};
mergeData();

const getImageUrl = (imageName: string) => {
  return `${imageName}`;
};

const bookPkg = (id: number) => {
  router.push({ name: "booking", params: { id } });
};

const handleSearch = (query: string) => {
  console.log("Sökning efter:", query);
};
</script>

<style scoped>
/* .main-content {
  background: url("/john-towner-7rlIPXTR6OI-unsplash.jpg") top no-repeat;
  background-size: cover;
  text-align: center;
  min-height: 100vh;
} */
/* .main-content {
  display: grid;
  grid-template-areas: "main aside";
  grid-template-columns: 2fr 1fr;
} */
.title {
  text-align: center;
  padding: 2rem;
}
.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.pkg-card {
  margin: 1rem;
  padding: 20px;
  border: 1px solid #ccc;
  /* width: 500px; */
  background-color: #f9f9f9;
  color: black;
  max-width: 350px;
  height: 400px;
  text-align: center;
}
.pkg-card h3 {
  margin: 0 0 10px;
}
.pkg-card button {
  margin-top: 1rem;
  padding: 1rem 2rem;
  background-color: #e82e11;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
}
.pkg-card button:hover {
  background-color: #07700e;
}
.image-wrapper {
  position: relative;
  width: 100%;
  height: 150px;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.overlay-text {
  position: absolute;
  top: 80%;
  left: 20%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 1.2rem;
  text-align: center;
}
.discount-text {
  position: absolute;
  top: 20%;
  left: 85%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: red;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 1rem;
  text-align: center;
}
.description {
  height: 70px;
  text-overflow: clip;
  overflow: hidden;
}

/* .package-hero {
    background: url('/john-towner-7rlIPXTR6OI-unsplash.jpg') top no-repeat;
    background-size: cover;
    height: 100vh;
  }
  
  .pkg-card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px;
  }
   */
</style>
