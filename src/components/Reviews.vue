<template>
  <div class="review-wrapper">
    <div v-for="review in allReviews" :key="review.name" class="review-card">
      <p class="review-item">{{ review.stars }}</p>
      <p class="review-item">{{ review.comment }}</p>
      <p class="review-item">{{ review.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import "../style/view/PackagePage.css";
import reviewsData from "../data/reviews.json";

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
    stars: starsToString(review.stars), // Använder vår konverteringsfunktion
    comment: review.comment,
    name: review.name,
  }))
);
</script>

<style scoped>
.review-wrapper {
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.review-card {
  height: 150px;
  width: 290px;
  background-color: #f9f9f9;
  color: black;
  margin: 1rem;
}
.review-item {
  padding: 0.2rem;
}
</style>
