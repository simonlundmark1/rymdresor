<template>
  <div class="carousel-container">
    <div ref="carousel" class="carousel-track">
      <div v-for="review in allReviews" :key="review.name" class="review-card">
        <p class="review-item">{{ review.stars }}</p>
        <p class="review-item">{{ review.comment }}</p>
        <p class="review-item">{{ review.name }}</p>
      </div>
    </div>
    <button class="prev-button" @click="prevReview">←</button>
    <button class="next-button" @click="nextReview">→</button>
  </div>
</template>

<script setup lang="ts">
import "../style/view/PackagePage.css";
import reviewsData from "../data/reviews.json";
import { ref, onMounted } from "vue";

interface Review {
  stars: string;
  comment: string;
  name: string;
}

function starsToString(stars: number): string {
  return "⭐".repeat(stars);
}

const allReviews: Review[] = reviewsData.flatMap((item) =>
  item.reviews.map((review) => ({
    stars: starsToString(review.stars),
    comment: review.comment,
    name: review.name,
  }))
);

const currentReview = ref(0);
const carousel = ref<HTMLDivElement | null>(null);
const cardWidth = 310;
const intervalTime = 3000;

const updateCarouselPosition = () => {
  if (carousel.value) {
    carousel.value.style.transform = `translateX(-${
      currentReview.value * cardWidth
    }px)`;
  }
};

const prevReview = () => {
  currentReview.value = Math.max(currentReview.value - 1, 0);
  updateCarouselPosition();
};

const nextReview = () => {
  currentReview.value = Math.min(
    currentReview.value + 1,
    allReviews.length - 1
  );
  updateCarouselPosition();
};

const autoScroll = () => {
  setInterval(() => {
    currentReview.value = (currentReview.value + 1) % allReviews.length;
    if (currentReview.value === allReviews.length - 1) {
      currentReview.value = 0;
    }
    updateCarouselPosition();
  }, intervalTime);
};

onMounted(() => {
  updateCarouselPosition();
  autoScroll();
});
</script>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
  width: 750px;
  margin: 2rem auto;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.review-card {
  height: 180px;
  min-width: 310px;
  background-color: #f9f9f9;
  color: black;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
  text-align: center;
  border-radius: 8px;
}
.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(232, 46, 17, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  z-index: 10;
}

.prev-button {
  left: -10px;
}
.next-button {
  right: -10px;
}

.review-card {
  height: 180px;
  min-width: 300px;
  background-color: #f9f9f9;
  color: black;
  margin-right: 1rem;
  padding: 0.5rem;
  background-color: rgb(190, 191, 189);
}
.review-item {
  padding: 0.2rem;
}
</style>
