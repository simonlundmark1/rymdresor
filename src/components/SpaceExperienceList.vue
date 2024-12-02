<template>
    <div>
      <h2>Våra rymdupplevelser</h2>
      <div v-for="experience in experiences" :key="experience.id" class="experience-card">
        <img :src="experience.image" alt="Experience image" />
        <h3>{{ experience.title }}</h3>
        <p>{{ experience.description }}</p>
        <button @click="viewDetails(experience.id)">Utforska</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'SpaceExperienceList',
    props: {
      experiences: {
        type: Array,
        required: true
      }
    },
    methods: {
      viewDetails(id: number) {
        this.$router.push(`/experience/${id}`);
      }
    }
  });
  </script>
  
  <style scoped>
  .experience-card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
    text-align: center;
  }
  .experience-card img {
    max-width: 100%;
    height: auto;
  }
  </style>
  