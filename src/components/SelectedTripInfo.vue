<template>
  <div v-if="filteredTrips.length > 0" class="trip-content">
    <div class="carousel">
      <button class="carousel-btn prev" @click="prevImage">&lt;</button>
      <img
        :src="`/${filteredTrips[0].image[currentImage]}`"
        :alt="`Bild ${currentImage + 1}`"
        class="carousel-image"
      />
      <button class="carousel-btn next" @click="nextImage">&gt;</button>
    </div>
    <h2 class="title">{{ filteredTrips[0].title }}</h2>
    <p class="description">{{ filteredTrips[0].description }}</p>
  </div>
  <p v-else>Loading data...</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

interface Trip {
  id: number;
  title: string;
  description: string;
  image: string[];
  food: string;
  discount: string;
  availableTrips: AvailableTrip[];
}

interface AvailableTrip {
  date: string;
  price: number;
}

const route = useRoute();
const trips = ref<Trip[]>([]);
const filteredTrips = ref<Trip[]>([]);
const currentImage = ref(0);

const fetchTrips = async () => {
  try {
    const resOne = await fetch("/src/data/data.json");
    if (!resOne.ok) {
      throw new Error(`Failed to fetch data: ${resOne.status}`);
    }
    const dataOne = await resOne.json();

    const resTwo = await fetch("/src/data/offersData.json");
    if (!resTwo.ok) {
      throw new Error(
        `Failed to fetch data from anotherData.json: ${resTwo.status}`
      );
    }
    const dataTwo: Trip[] = await resTwo.json();

    const combinedData = [...dataOne.experiences, ...dataTwo];

    const id = route.params.id;
    trips.value = combinedData;

    filteredTrips.value = trips.value.filter(
      (trip: Trip) => trip.id === Number(id)
    );
  } catch (error) {
    console.error("Error fetching trips:", error);
  }
};

const nextImage = () => {
  if (filteredTrips.value.length > 0) {
    currentImage.value =
      (currentImage.value + 1) % filteredTrips.value[0].image.length;
  }
};

const prevImage = () => {
  if (filteredTrips.value.length > 0) {
    currentImage.value =
      (currentImage.value - 1 + filteredTrips.value[0].image.length) %
      filteredTrips.value[0].image.length;
  }
};

onMounted(() => {
  fetchTrips();
});
</script>

<style scoped>
.trip-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}
.carousel {
  position: relative;
  display: inline-block;
  width: 90%;
  max-width: 600px;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-image {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 18px;
}

.carousel-btn.prev {
  left: 10px;
}

.carousel-btn.next {
  right: 10px;
}
.description {
  max-width: 450px;
  padding: 1rem;
  font-size: 1.2rem;
}
@media (max-width: 768px) {
  .carousel {
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .carousel-btn {
    font-size: 16px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .carousel-btn {
    font-size: 14px;
    padding: 6px;
  }
}
</style>
