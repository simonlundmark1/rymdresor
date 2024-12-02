<template>
  <div
      v-for="experience in experiences"
      :key="experience.id"
      class="experience-card"
      :style="getBackgroundStyle(experience.image)"
      >
      <h2>{{ experience.title }}</h2>
      <p>{{ experience.description }}</p>
      <button @click="viewDetails(experience.id)">Utforska</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SpaceExperienceList',
  props: {
    experiences: {
      type: Array,
      required: true,
    },
  },
  methods: {
    viewDetails(id: number) {
      this.$router.push(`/experience/${id}`);
    },
    getBackgroundStyle(imageUrl: string | null) {
      if (imageUrl) {
        return {
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      }
      return {
        height: '200px', // Om ingen bild finns, bibehåll höjden
        backgroundColor: '#f0f0f0', // Alternativ bakgrundsfärg
        borderRadius: '8px',
      };
    },
  },
});
</script>

<style scoped>
  .experience-card{
    padding: 0;
    margin: 0;
    height: 90vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  h2{
    font-size: 60px;
  }
  button{
    background: none;
    border: none;
    color: white;

  }
  button:hover{
    cursor: pointer;
  }
</style>
